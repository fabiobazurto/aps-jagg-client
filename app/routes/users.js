import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import query from "../gql/queries/users.graphql";
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
    apollo: service(),
    model() {
	return this.apollo.watchQuery({ query: query });
    }
});

