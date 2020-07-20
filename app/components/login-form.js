import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import query from "../gql/queries/me.graphql";

export default class LoginFormComponent extends Component {
    @tracked errorMessage;
    @service session;

    @service router
    @service apollo;
    
    async authenticate() {
        let {identification, password} = this;
        let _me = this;
        try {
            await this.session
                .authenticate('authenticator:oauth2', {identification, password});
        } catch(error) {
            this.errorMessage = error.error || error;
        }

        if (this.session.isAuthenticated) {
	    let user = this.apollo.watchQuery({query: query});
            _me.router.transitionTo('index'); 
        }
    }    
}
