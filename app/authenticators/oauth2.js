// app/authenticators/oauth2.js
//import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

//export default class OAuth2Authenticator extends OAuth2PasswordGrant {
import Base from 'ember-simple-auth/authenticators/base';
import mutation from "../gql/mutations/login.graphql";
import { inject as service } from "@ember/service";
import { Promise } from 'rsvp';
import { isEmpty } from '@ember/utils';
import { run } from '@ember/runloop';
import { resolve } from 'rsvp';

export default Base.extend({
    serverTokenEndpoint:'http://localhost:4000/graphql',
    apollo: service(),     
    restore: function(data) {
	return new Promise(function(resolve, reject){
	    if(!isEmpty(data.token)) {
		resolve(data);
	    } else {
		reject();
	    }
	});
    },
    authenticate: function(options) {
	return new Promise((resolve, reject) => {
	    return this.get("apollo").mutate({mutation:  mutation, variables: {email: options.identification, password: options.password} },"login").then(
		function(response){
		    resolve({
			token:response
		    });//resolve
		},
		function(xhr){//, status, error) {
		    var response = xhr.responseText;
		    run(function(){
			reject(response);
		    });
		});
        });
    },

    invalidate: function() {
	return resolve();
    }
    
})
