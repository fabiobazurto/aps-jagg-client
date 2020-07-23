import Component from '@glimmer/component';

import { tracked } from '@glimmer/tracking';
export default class AvatarComponent extends Component {

    @tracked image;

    loadImage(element, [uridata]){
        
        console.log('render');
        if(!uridata){
            uridata = 'images/default.png'
        }
        element.src = uridata;
    }
}
