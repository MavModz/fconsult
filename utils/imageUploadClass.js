// utils/imageUploadClass.js

export default class ImageUploadClass {
    constructor(b) {
        this.sign = b;
        this.croppedDataUrl = null;
        this.url = null;
        this.loading = false;
        this.selectedImage = null;
        this.showCropper = false;
        this.DialogueModal = false;
        this.pre = b.pre||null;
        this.random = b.random||true;
    }

    async handleImageChange(event) {
        if (event.target.files[0].type.split("/")[0] !== 'image') {
            alert("Please upload a valid image file");
            this.loading = false;
            return;
        }
        const sign_selectedFile = event.target.files[0];
        this.DialogueModal = true;
        if (sign_selectedFile) {
            this.selectedImage = URL.createObjectURL(sign_selectedFile);
            this.showCropper = true;
            this.DialogueModal = true;
        }
    }

    async getUrl() {
        this.loading = true;
        try {
            if(this.random){
                this.pre=this.pre + Date.now()
                this.url = await uploadImage(null, this.croppedDataUrl,this.pre,this.random);
            }else{
                this.url = await uploadImage(null, this.croppedDataUrl,this.pre,this.random);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            this.loading = false;
            this.DialogueModal = true;
        }
    }

    updateCroppedData({ coordinates = null, canvas }) {
        this.croppedDataUrl = canvas.toDataURL();
    }

    reset() {
        this.croppedDataUrl = null;
        this.url = null;
        this.loading = false;
        this.selectedImage = null;
        this.showCropper = false;
        this.DialogueModal = false;
    }
}
