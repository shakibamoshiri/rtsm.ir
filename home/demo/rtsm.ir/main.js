import React, { Fragment, Component } from "react";
import { render } from "react-dom";
const log = console.log;

const Prism = ( props ) => <pre><code className="language-javascript">{ props.children }</code></pre>;
const Title = ( props ) => <h1 className="title">{ props.children }</h1>;
const SubTitle = ( props ) => <h3 className="sub-title">{ props.children }</h3>;

if(!( "WebSocket" in window )){
    alert( "Your Browser Does not Support HTML5 WebSocket API" );
    exit;
}

const services = {
    logs: {
        address: "localhost",
        port: 3330,
        target: "service-logs"
    },
    build: {
        address: "localhost",
        port: 3331,
        target: "service-build"
    },
    status: {
        address: "localhost",
        port: 3332,
        target: "service-status"
    },
};

function webSocketManager( service ){
    const ws = new WebSocket( `ws://${ service.address }:${ service.port }` );
    ws.onopen = function(){
        log( `web socket was opened for ${ service.target }` );
    }
    ws.onclose = function(){
        log( `web socket was closed for ${ service.target }` );
    }
    ws.onmessage = function( payload ){
        displayData( payload.data, service.target );
    }
}

function displayData( data, target ){
    const pre = document.getElementById( target );
    const code = document.createElement( "code" );
    code.textContent = data;
    pre.appendChild( code );
}

webSocketManager( services.logs );
webSocketManager( services.build );
webSocketManager( services.status );

const description = <Fragment>
    <p>Here is the log of <a target="_blank" href="http://rtsm.ir">rtsm.ir</a> which is a node js microserice for managing this dmoe.</p>
    <p>Do not close this page and meanwhile open <a target="_blank" href="http://rtsm.ir">rtsm.ir</a> in a separate window with your browser.</p>
    <p>Navigate between pages (= links) and watch here at the same time.</p>
</Fragment>; 
render( description, document.getElementById( "description" ) );
