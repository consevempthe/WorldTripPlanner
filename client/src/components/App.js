import React, { Component } from "react";
import { Collapse, Container } from "reactstrap";

import "bootstrap/dist/css/bootstrap.css";
import "./tcowebstyle.css";

import Header from "./Margins/Header";
import ErrorBanner from "./ErrorBanner";
import About from "./About/About.js";
import Atlas from "./Atlas/Atlas";
import Footer from "./Margins/Footer";

import { getOriginalServerPort, sendServerRequest } from "../utils/restfulAPI";
import { isJsonResponseValid } from "../utils/restfulAPI";
import log from "../utils/globals";
import * as configSchema from "../../schemas/TIPConfigResponseSchema";
import { HTTP_BAD_REQUEST, HTTP_OK } from "./Constants";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showAbout: false,
            serverSettings: {serverPort: getOriginalServerPort(), serverConfig: null},
            errorMessage: null
        };

        this.toggleAbout = this.toggleAbout.bind(this);
        this.updateServerConfig = this.updateServerConfig.bind(this);

        sendServerRequest('config', this.state.serverSettings.serverPort).then(config => {
            this.processConfigResponse(config);
        });
    }

    render() {
        return (
            <div className="csu-branding">
                <Header toggleAbout={this.toggleAbout}/>
                {this.state.errorMessage}
                {this.renderAbout()}
                {this.renderHome()}
                <Footer
                    serverSettings={this.state.serverSettings}
                    updateServerConfig={this.updateServerConfig}
                />
            </div>
        );
    }

    renderAbout() {
        return(
            <Collapse isOpen={this.state.showAbout}>
                <About closePage={this.toggleAbout}/>
            </Collapse>
        );
    }

    renderHome() {
        return (
            <Collapse isOpen={!this.state.showAbout}>
                <Atlas
                    modify={(state, value) => this.setState({[state]: value})}
                />
            </Collapse>
        );
    }

    toggleAbout() {
        const newState = !this.state.showAbout;
        this.setState({showAbout: newState});
    }

    processConfigResponse(configResponse) {
        if(!isJsonResponseValid(configResponse.body, configSchema)) {
            this.processServerConfigError("INVALID_RESPONSE", HTTP_BAD_REQUEST, `Configuration response not valid`);
        } else if(configResponse.statusCode === HTTP_OK) {
            this.updateServerConfig(configResponse.body);
        } else {
            this.processServerConfigError(configResponse.statusText, configResponse.statusCode, `Failed to fetch config from ${this.state.clientSettings.serverPort}. Please choose a valid server.`);
        }
    }

    updateServerConfig(config, port=this.state.serverSettings.serverPort) {
        log.info("Switching to server ", this.state.serverSettings.serverPort);
        let updatedSettings = {
            serverConfig: config,
            serverPort: port
        };
        this.setState({serverSettings: updatedSettings});
        this.setState({errorMessage: null});
    }

    processServerConfigError(statusText, statusCode, message) {
        let updatedSettings = Object.assign(this.state.serverSettings);
        updatedSettings.serverConfig = null;
        this.setState({serverSettings: updatedSettings, errorMessage: this.createErrorBanner(statusText, statusCode, message)});
    }

    createErrorBanner(statusText, statusCode, message) {
        return (
            <Container>
                <ErrorBanner statusText={statusText}
                             statusCode={statusCode}
                             message={message}
                />
            </Container>
        );
    }
}

