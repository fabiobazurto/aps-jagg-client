import Route from '@ember/routing/route';
//import { inject } from '@ember/service';
import { queryManager } from "ember-apollo-client";
//import UnsubscribeRoute from 'ember-apollo-client/mixins/unsubscribe-route';
//import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from "../gql/queries/user.graphql";


//export default Route.extend(UnsubscribeRoute, {
//export default Route.extend(RouteQueryManager, {
export default Route.extend( {    
    //    apollo: inject.service(),
    apollo: queryManager(),
    model() {
	//	return this.get('apollo').query({query},'me').catch(error => alert(error))
        return this.apollo.watchQuery({ query: query });
    }
});
