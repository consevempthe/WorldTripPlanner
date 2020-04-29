import React, { Component } from "react";
import { Container } from "reactstrap";

import ServerSettings from "./ServerSettings";
import ServerConfig from "./ServerConfig";

import "./header-footer.css";

const UNICODE_LINK_SYMBOL = "\uD83D\uDD17";
const UNICODE_WARNING_SIGN = "\u26A0";
const UNKNOWN_SERVER_NAME = "Unknown";

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {serverSettingsOpen: false, serverConfigOpen: false};
    }

    render() {
        return (
            <div className="full-width footer">
                {this.renderServerInformation()}
            </div>
        );
    }

    renderServerInformation() {
        const serverName = this.getServerNameFromConnectionStatus();
        const linkStatusSymbol = this.getSymbolFromConnectionStatus();
        return (
            <div className="vertical-center tco-text">
                <Container>
                    <div className="centered">
                        {linkStatusSymbol} Connected to <a className="tco-text" onClick={() => this.setState({serverConfigOpen: true})}>{serverName}</a>
                        <a className="tco-text" onClick={() => this.setState({serverSettingsOpen: true})}>
                            ({this.props.serverSettings.serverPort}).
                        </a>
                    {this.renderServerSettings()}
                    {this.renderServerConfig()}
                    </div>
                </Container>
            </div>
        );
    }

    getSymbolFromConnectionStatus() {
        return this.connectedToValidServer() ? UNICODE_LINK_SYMBOL : UNICODE_WARNING_SIGN;
    }

    getRequestVersionFromConnectionStatus()
    {
        return this.connectedToValidServer() ? this.props.serverSettings.serverConfig.requestVersion : UNKNOWN_SERVER_NAME;
    }

    getRequestTypeFromConnectionStatus()
    {
        return this.connectedToValidServer() ? this.props.serverSettings.serverConfig.requestType : UNKNOWN_SERVER_NAME;
    }

    getServerNameFromConnectionStatus() {
        return this.connectedToValidServer() ? this.props.serverSettings.serverConfig.serverName : UNKNOWN_SERVER_NAME;
    }

    getSupportedRequestsFromConnectionStatus() {
        return this.connectedToValidServer() ? this.props.serverSettings.serverConfig.supportedRequests : [UNKNOWN_SERVER_NAME];
    }

    connectedToValidServer() {
        return this.props.serverSettings.serverConfig && this.props.serverSettings.serverConfig.serverName;
    }

    getOptimizations() {
        return this.connectedToValidServer() ? this.props.serverSettings.serverConfig.optimization : UNKNOWN_SERVER_NAME;
    }

    getFilter() {
        return this.connectedToValidServer() ? this.props.serverSettings.serverConfig.filter : UNKNOWN_SERVER_NAME;
    }

    renderServerSettings() {
        return (
            <ServerSettings
                isOpen={this.state.serverSettingsOpen}
                toggleOpen={(isOpen = !this.state.serverSettingsOpen) => this.setState({serverSettingsOpen: isOpen})}
                serverSettings={this.props.serverSettings}
                updateServerConfig={this.props.updateServerConfig}
            />
        );
    }

    renderServerConfig() {
        return(
            <ServerConfig
                isOpen={this.state.serverConfigOpen}
                toggleOpen={(isOpen = !this.state.serverConfigOpen) => this.setState({serverConfigOpen: isOpen})}
                serverName={this.getServerNameFromConnectionStatus()}
                requestType={this.getRequestTypeFromConnectionStatus()}
                requestVersion={this.getRequestVersionFromConnectionStatus()}
                supportedRequests={this.getSupportedRequestsFromConnectionStatus()}
                optimization={this.getOptimizations()}
                filter={this.getFilter()}
            />
        );
    }

}
