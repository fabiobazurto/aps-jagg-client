import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

import uploadfile from "../gql/mutations/uploadFile.graphql";

export default class S3UploadComponent extends Component {

    @service apollo;

    async uploadImage(file){

        let _me = this;
        debugger
        return file.readAsDataURL().then(function (result) {

            _me.apollo.mutate({mutation:  uploadfile, variables: {image: result} },"singleUpload").then(function(){
                let img = document.getElementsByClassName('avatar');
                img[0].src=result;
                return true;
            });
            
            
        });
        
    }
}
