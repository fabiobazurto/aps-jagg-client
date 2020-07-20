import Route from '@ember/routing/route';
import { queryManager } from "ember-apollo-client";
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import query from "../gql/queries/books.graphql";

export default Route.extend(AuthenticatedRouteMixin, {    
    //    apollo: inject.service(),
    apollo: queryManager(),
    model() {
        return this.apollo.watchQuery({ query: query });
    }
});




