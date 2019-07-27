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

const ws = new WebSocket( "ws://localhost:3340" );
ws.onopen = function(){
    log( "msfun web socket was opened" );
}
ws.onclose = function(){
    log( "msfun web socket was closed" );
}
ws.onmessage = function( payload ){
    displayData( payload.data );
}

function displayData( data ){
    const pre = document.getElementById( "servie-logs" );
    const code = document.createElement( "code" );
    code.textContent = data;
    pre.appendChild( code );
}

const description = <Fragment>
    <p>Here is the log of <a target="_blank" href="http://msfun.ir">msfun.ir</a> which is a node js microservice for managing the blog.</p>
    <p>Do not close this page and meanwhile open <a target="_blank" href="http://msfun.ir">msfun.ir</a> in a separate window with your browser.</p>
    <p>Navigate between pages (= links) and watch here at the same time.</p>
    <h3 class="sub-title">Mointoring logs and git merge in real-time:</h3>
</Fragment>; 
render( description, document.getElementById( "description" ) );
