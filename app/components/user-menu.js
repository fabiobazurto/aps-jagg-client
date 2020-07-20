import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";

export default class UserMenuComponent extends Component {
    @service session;
    @service router;
    @action
    invalidateSession() {
	this.session.invalidate();
        let _me = this;
        _me.router.transitionTo('login'); 
    }
    
}
