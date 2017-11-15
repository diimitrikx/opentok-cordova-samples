/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
      
        // Set Credentials
        var apiKey = '';
        var sessionId = '';
        var token = '';
        
        // Initialize Session Object
        var session = OT.initSession(apiKey, sessionId);
                
        function createMessageElement(message, user) {
          var chatHistory = document.getElementById('chatHistory');
          var newMessage = document.createElement('p');
          newMessage.textContent = `${user}: ${message}`;
          chatHistory.appendChild(newMessage);
        }
        
        function sendSignal(message) {
          session.signal({
            data: message,
            type: 'chat'
          });
        }
        
        function setEventListener() {
          var button = document.querySelector('button');
          button.addEventListener('click', function () {
            var message = document.getElementById('chatMessage');
            sendSignal(message.value);
            createMessageElement(message.value, 'Me');
            message.value = "";
          });
        }
        
        session.on({
          'signal:chat': function (event) {
            if (session.connection.connectionId !== event.from.connectionId) {
              createMessageElement(event.data, 'Other');
            }
          }
        });
        
        session.connect(token, function () {
          setEventListener();
        });
        
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);
    }
};

app.initialize();