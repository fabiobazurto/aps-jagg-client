/*import ApolloService from 'ember-apollo-client/services/apollo';
import { inject as service } from '@ember/service';
import { setContext } from 'apollo-link-context';
import { Promise } from 'rsvp';
import { computed } from "@ember/object";

export default ApolloService.extend({
    session: service(),
    link: computed(function() {
	let httpLink = this._super(...arguments);

	let authLink = setContext((request, context) => {
	    return this._runAuthorize(request, context);
	});
	return httpLink;
    }),

    _runAuthorize(req, next) {
	debugger
	if (!req.options.headers) {
	    req.options.headers = {};
	}

	const token = session.get("data.authenticated.token");;
	req.options.headers.authorization = token ? `Bearer ${token}` : null;
	next();
    }
});
*/

import ApolloService from 'ember-apollo-client/services/apollo';
import { inject as service } from '@ember/service';
import { setContext } from 'apollo-link-context';
import { Promise } from 'rsvp';

const apollo = class OverriddenApollo extends ApolloService {
  @service
  session;

    link() {
	let httpLink = super.link();

	let authLink = setContext((request, context) => {
	    return this._runAuthorize(request, context);
	});
	
	return authLink.concat(httpLink);
    }

    _runAuthorize(req, next) {

	if (!this.session.isAuthenticated) {
	    return {};
	}

	const token = { headers: { 'Authorization': 'Bearer ' + this.session.data.authenticated.token   } }; 

	return token;
    }
}

export default apollo;
