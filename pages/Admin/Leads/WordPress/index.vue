<template>
    <div v-if="data" class="wordpress-parent">
        <div class="wordpress-wordpress-frame">
            <div class="text-wrapper" id="wordpress-integration">WordPress Form Integration</div>
            <p class="create-custom-form">Create Your Own Forms and Integrate Seamlessly with Any Custom Website or
                Landing pages to Fetch Leads Directly into Your CRM.</p>
        </div>
        <div class="wordpress-frame">
            <div class="div">
                <div class="text-wrapper">Webhook URL</div>
                <div class="component relative">
                    <input class="text-wrapper-2" type="text"
                    :placeholder="`${baseurl}/add-customform-leads/${data.user.company_id}`" 
                     disabled />
                    <img  @click="copyToClipboard()" class="tabler-copy cursor-pointer" src="/img/png/tabler_copy.png" />
                </div>
            </div>
            <div class="form-wrapper">
                <div class="text-wrapper-3">Payload</div>
                <div class="form custom-form-wordpress-2nd relative">
                    <p class="id-instituteid">
                        {<br />&#34;name&#34;: &#34;test user&#34;, <br />&#34;email&#34;: test@gmail.com, <br />&#34;phone&#34;:0123456789
                        <br />}
                    </p>
                    <img @click="copyToClipboardPayload()" class="tabler-copy-2nd cursor-pointer" src="/img/png/tabler_copy.png" />
                </div>
            </div>
        </div>
        <div class="d-flex justify-between items-center mt-[30px] wordprs-last-suported">
           <p class="text-[#0f172a] text-[21px]">Supported Contact Forms</p> 
           <img src="/img/png/image 76.png" alt="">
        </div>


    </div>
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
export default {
    data() {
        return {
            data: null,
            baseurl:null
        }
    },
    async setup() {
      
    const data = (await useFetch('/api/users/admin')).data.value;
    return { data };
  },
  async mounted(){
    activateMenu('wordpress-integration','WordPress Form Integration',true)
    const fb = useRuntimeConfig()
    this.baseurl= fb.public.API_URL;
  },
    methods: {
    async copyToClipboard() {
      try {
       
        await navigator.clipboard.writeText(`${this.baseurl}/add-customform-leads/${this.data.user.company_id}`);
        successAlert("Api Url Copied To Vlipboard");
      }
      catch (err) {

        errorAlert("Failed to copy text to clipboard!");
      }
    },
    async copyToClipboardPayload() {
    try {
        const payloadText = document.querySelector('.id-instituteid').innerText;
        await navigator.clipboard.writeText(payloadText);
        successAlert("Payload Copied To Clipboard");
    } catch (err) {
        errorAlert("Failed to copy text to clipboard!");
    }
}

  },
}
</script>
<style>
.wordpress-parent {
    background-color: #fff;
    border-radius: 14px;
    box-shadow: 0 4.934579372406006px 19.738317489624023px #1f1b2d1f;
    padding: 35px 25px 60px
}

.wordpress-wordpress-frame .text-wrapper {
    color: #1f1f1f;
    font-size: 26px;
    font-weight: 500;
    line-height: 26px;
    border-bottom: 2px solid #e4e0ec;
    padding-block-end: 20px;
    margin-block-end: 20px
}

.wordpress-wordpress-frame .create-custom-form {
    color: #9e9e9e;
    font-size: 21px;
    font-weight: 400;
    line-height: 31px
}

.wordpress-frame {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 42px;
    position: relative;
    padding-top: 30px;
    width: -webkit-fill-available
}

.wordpress-frame .div {
    width: -webkit-fill-available
}

.wordpress-frame .text-wrapper {
    font-weight: 500;
    color: #0f172a;
    font-size: 21.1px;
    letter-spacing: 0;
    line-height: 19px;
    padding-bottom: 22px
}

.wordpress-frame .component {
    position: relative;
    width: 75%;
    background-color: #f1f5f966;
    border-radius: 15.31px;
    border: 1.53px solid #cbd5e1;
    padding: 18px 20px
}

.wordpress-frame .div-2 {
    display: flex;
    width: 95%;
    align-items: center;
    justify-content: space-between;
    position: relative;
    top: 19px;
    left: 22px
}

.wordpress-frame .text-wrapper-2 {
    font-size: 19.4px;
    letter-spacing: .31px;
    background-color: #f9fbfd;
    outline: none;
    border: none;
}

.wordpress-frame .tabler-copy {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 20px;
    bottom: 32px
}

.wordpress-frame .tabler-copy-2nd {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 25px;
    bottom: 20px
}

.wordpress-frame .form-wrapper {
    width: 100%
}

.wordpress-frame .form {
    width: 75%
}

.custom-form-wordpress-2nd {
    width: -webkit-fill-available;
    background-color: #f1f5f966;
    border-radius: 15.31px;
    border: 1.53px solid #cbd5e1;
    padding: 22px 15px 22px 30px
}

.wordpress-frame .div-3 {
    display: flex;
    width: 731px;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 0 0 12px;
    position: relative;
    top: 28px;
    left: 40px
}

.wordpress-frame .id-instituteid {
    font-weight: 400;
    font-size: 19.4px;
    letter-spacing: .31px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box
}

.wordpress-frame .text-wrapper-3 {
    font-weight: 500;
    color: #0f172a;
    font-size: 21.1px;
    letter-spacing: 0;
    line-height: 19px;
    padding-bottom: 22px
}
.wordprs-last-suported{
    width: 75%;
}
@media screen and (max-width:767px){
    .wordpress-frame .component{
        width: 100%;
    }
    .wordpress-frame .form {
    width: 100%;
}
.wordprs-last-suported{
    width: 100%;
}
}
</style>