<!-- @format -->

<template>
    <div class="copy-form-container">
        <div class="copy-form-wrapper">
            <div class="copy-form-left">
                <div class="copy-form-left-btn">
                    <span @click="toggleSection" class="copy-form-left-section">Section</span>
                    <span @click="toggleDesign" class="copy-form-left-design">Design</span>
                </div>
                <div class="search-container">
                    <img src="/img/png/aabb.png" alt="">
                    <Input type="text" placeholder="Search" />
                </div>
                <div v-show="design_data_back" class="form-dynmaic-changr-design-show">
                    <div class="form-copy-frm-backg-cont">
                        <div class="form-copy-frm-backstl">
                            <span class="form-copy-frm-backstl-font">Form Background</span>
                            <span @click="open_formBackground" style="cursor: pointer;"><img
                                    src="/img/png/dwn.png" alt=""></span>
                        </div>
                        <div v-show="frm_backgrd" class="form-copy-frm-backg-openafter">
                            <span class="form-copy-label-dgnda">Color</span>
                            <div class="form-color-border-back">
                                <input type="color" v-model="color" @input="updateColor()" class="form-backg-form-inpt">
                                <span>{{ color }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-copy-frm-backg-cont">
                        <div class="form-copy-frm-backstl">
                            <span class="form-copy-frm-backstl-font">Form Title</span>
                            <span @click="open_formTitle" style="cursor: pointer;"><img src="/img/png/dwn.png"
                                    alt=""></span>
                        </div>
                        <div v-show="frm_Title">
                            <div class="mb-3">
                                <label class="form-copy-label-dgnda">Font Family</label>
                                <select v-model="fontFamily" >
                                    <option value="" disabled selected>Select</option>
                                    <option value="Poppins">Poppins</option>
                                    <option value="Normal">Normal</option>
                                </select>
                            </div>
                            <div class="copy-fm-html-sixw-wgh">
                                <div class="mb-3 width-frm-whjk">
                                    <label class="form-copy-label-dgnda">Weight</label>
                                    <select v-model="fontWeight" class="form-select"
                                        >
                                        <option value="" disabled selected>Select</option>
                                        <option value="normal">normal</option>
                                        <option value="bold">bold</option>
                                        <option value="lighter">lighter</option>
                                        <option value="bolder">bolder</option>
                                    </select>
                                </div>
                                <div class="mb-3 width-frm-whjk">
                                    <label class="form-copy-label-dgnda">Size</label>
                                    <select v-model="fontSize" >
                                        <option value="" disabled selected>Select</option>
                                        <option value="10px">30px</option>
                                        <option value="35px">35px</option>
                                        <option value="48px">48px</option>
                                        <option value="40px">40px</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-copy-frm-backg-openafter">
                                <span>Color</span>
                                <div class="form-color-border-back">
                                    <input type="color" v-model="colorTitle" class="form-backg-form-inpt">
                                    <span>{{ color }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-copy-frm-backg-cont">
                        <div class="form-copy-frm-backstl">
                            <span class="form-copy-frm-backstl-font">Form Label</span>
                            <span @click="open_formLabel" style="cursor: pointer;"><img src="/img/png/dwn.png"
                                    alt=""></span>
                        </div>
                        <div v-show="frm_Label">
                            <div class="mb-3">
                                <label class="form-copy-label-dgnda">Font Family</label>
                                <select v-model="fontFamilylabel" class="form-select"
                                    >
                                    <option value="" disabled selected>Select</option>
                                    <option value="Poppins">Poppins</option>
                                    <option value="Normal">Normal</option>
                                </select>
                            </div>
                            <div class="copy-fm-html-sixw-wgh">
                                <div class="mb-3 width-frm-whjk">
                                    <label class="form-copy-label-dgnda">Weight</label>
                                    <select v-model="fontWeightlabel" class="form-select"
                                        >
                                        <option value="" disabled selected>Select</option>
                                        <option value="normal">normal</option>
                                        <option value="bold">bold</option>
                                        <option value="lighter">lighter</option>
                                        <option value="bolder">bolder</option>
                                    </select>
                                </div>
                                <div class="mb-3 width-frm-whjk">
                                    <label class="form-copy-label-dgnda">Size</label>
                                    <select v-model="fontSizelabel" class="form-select"
                                        >
                                        <option value="" disabled selected>Select</option>
                                        <option value="10px">30px</option>
                                        <option value="35px">35px</option>
                                        <option value="48px">48px</option>
                                        <option value="40px">40px</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-copy-frm-backg-openafter">
                                <span>Color</span>
                                <div class="form-color-border-back">
                                    <input type="color" v-model="colorTitlelabel" class="form-backg-form-inpt">
                                    <span>{{ color }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-copy-frm-backg-cont">
                        <div class="form-copy-frm-backstl">
                            <span class="form-copy-frm-backstl-font">Form field</span>
                            <span @click="open_formfield" style="cursor: pointer;"><img src="/img/png/dwn.png"
                                    alt=""></span>
                        </div>
                        <div v-show="frm_Field">
                            <div class="mb-3">
                                <label class="form-copy-label-dgnda">Placeholder Font Family</label>
                                <select v-model="fontFamilyField" class="form-select"
                                    >
                                    <option value="" disabled selected>Select</option>
                                    <option value="Poppins">Poppins</option>
                                    <option value="Normal">Normal</option>
                                </select>
                            </div>
                            <div class="copy-fm-html-sixw-wgh">
                                <div class="mb-3 width-frm-whjk">
                                    <label class="form-copy-label-dgnda">Weight</label>
                                    <select v-model="fontWeightField" class="form-select"
                                        >
                                        <option value="" disabled selected>Select</option>
                                        <option value="normal">normal</option>
                                        <option value="bold">bold</option>
                                        <option value="lighter">lighter</option>
                                        <option value="bolder">bolder</option>
                                    </select>
                                </div>
                                <div class="mb-3 width-frm-whjk">
                                    <label class="form-copy-label-dgnda">Size</label>
                                    <select v-model="fontSizeField" class="form-select"
                                        >
                                        <option value="" disabled selected>Select</option>
                                        <option value="10px">30px</option>
                                        <option value="35px">35px</option>
                                        <option value="48px">48px</option>
                                        <option value="40px">40px</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-copy-frm-backg-openafter">
                                <span>Color</span>
                                <div class="form-color-border-back">
                                    <input type="color" v-model="colorTitleField" class="form-backg-form-inpt">
                                    <span>{{ color }}</span>
                                </div>
                            </div>

                            <div class="copy-fm-html-sixw-wgh-ww">
                                <div class="mb-3 width-frm-whjk">
                                    <label class="form-copy-label-dgnda">Border Style</label>
                                    <select v-model="BorderStyleField" class="form-select"
                                        >
                                        <option value="" disabled selected>Select</option>
                                        <option value="solid">solid</option>
                                        <option value="dotted">dotted</option>
                                        <option value="dashed">dashed</option>

                                    </select>
                                </div>
                                <div class="mb-3 width-frm-whjk">
                                    <label class="form-copy-label-dgnda">Border Width</label>
                                    <select v-model="BorderWidthField" class="form-select"
                                        >
                                        <option value="" disabled selected>Select</option>
                                        <option value="1px">1px</option>
                                        <option value="2px">2px</option>
                                        <option value="3px">3px</option>
                                        <option value="4px">4px</option>
                                        <option value="5px">5px</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-copy-frm-backg-openafter">
                                <span>Border Color</span>
                                <div class="form-color-border-back">
                                    <input type="color" v-model="BordercolorField" class="form-backg-form-inpt">
                                    <span>{{ color }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-copy-frm-backg-cont">
                        <div class="form-copy-frm-backstl">
                            <span class="form-copy-frm-backstl-font">Submit Button</span>
                            <span @click="open_formbutton" style="cursor: pointer;"><img src="/img/png/dwn.png"
                                    alt=""></span>
                        </div>

                        <div v-show="frm_button">
                            <div class="copy-frm-normal-hover-sett">
                                <button class="copy-frm-normal-sett">Normal</button>
                                <button class="copy-frm-normal-sett">Hover</button>
                            </div>
                            <div class="mb-3">
                                <label class="form-copy-label-dgnda">Font Family</label>
                                <select v-model="fontFamilybutton" class="form-select"
                                    >
                                    <option value="" disabled selected>Select</option>
                                    <option value="Poppins">Poppins</option>
                                    <option value="normal">Normal</option>
                                </select>
                            </div>
                            <div class="copy-fm-html-sixw-wgh">
                                <div class="mb-3 width-frm-whjk">
                                    <label class="form-copy-label-dgnda">Weight</label>
                                    <select v-model="fontWeightbutton" class="form-select"
                                        >
                                        <option value="" disabled selected>Select</option>
                                        <option value="normal">normal</option>
                                        <option value="bold">bold</option>
                                        <option value="lighter">lighter</option>
                                        <option value="bolder">bolder</option>
                                    </select>
                                </div>
                                <div class="mb-3 width-frm-whjk">
                                    <label class="form-copy-label-dgnda">Size</label>
                                    <select v-model="fontSizebutton" class="form-select"
                                        >
                                        <option value="" disabled selected>Select</option>
                                        <option value="10px">10px</option>
                                        <option value="20px">20px</option>
                                        <option value="30px">30px</option>
                                        <option value="35px">35px</option>
                                        <option value="48px">48px</option>
                                        <option value="40px">40px</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-copy-frm-backg-openafter">
                                <span>Color</span>
                                <div class="form-color-border-back">
                                    <input type="color" v-model="colorbutton" class="form-backg-form-inpt">
                                    <span>{{ color }}</span>
                                </div>
                            </div>

                            <div class="copy-fm-html-sixw-wgh-ww">
                                <div class="mb-3 width-frm-whjk">
                                    <label class="form-copy-label-dgnda">Border Style</label>
                                    <select v-model="BorderStylebutton" class="form-select"
                                        >
                                        <option value="" disabled selected>Select</option>
                                        <option value="solid">solid</option>
                                        <option value="dotted">dotted</option>
                                        <option value="dashed">dashed</option>

                                    </select>
                                </div>
                                <div class="mb-3 width-frm-whjk">
                                    <label class="form-copy-label-dgnda">Border Width</label>
                                    <select v-model="BorderWidthbutton" class="form-select"
                                        >
                                        <option value="" disabled selected>Select</option>
                                        <option value="1px">1px</option>
                                        <option value="2px">2px</option>
                                        <option value="3px">3px</option>
                                        <option value="4px">4px</option>
                                        <option value="5px">5px</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-copy-frm-backg-openafter">
                                <span>Background Color</span>
                                <div class="form-color-border-back">
                                    <input type="color" v-model="Backgroundcolorbutton" class="form-backg-form-inpt">
                                    <span>{{ color }}</span>
                                </div>
                            </div>

                            <div class="form-copy-frm-backg-openafter">
                                <span>Border Color</span>
                                <div class="form-color-border-back">
                                    <input type="color" v-model="Bordercolorbutton" class="form-backg-form-inpt">
                                    <span>{{ color }}</span>
                                </div>
                            </div>

                            <div class="copy-frm-attch-lnks-sfw">
                                <span>
                                    <span>Attach Custom Link</span>
                                    <input type="checkbox">
                                </span>
                                <input class="outline-none-https" type="text" placeholder="https://">
                            </div>

                            <div class="copy-frm-attch-lnks-sfw">
                                <label class="copy-frm-attch-lnks-sfw-labeld">Form Submission Message</label>
                                <input class="outline-none-https" type="text" placeholder="custom message">
                            </div>
                        </div>
                    </div>


                </div>
                <div v-show="!design_data_back" class="form-dynmaic-changr-section-click">
                    <div v-show="!all_checkbox" class="form-detail-hide-desriptiog">
                        <div class='form-copy-code-title'>
                            <div>
                                <img src="/img/png/titl.png" alt="">
                                <span class='form-copy-code-title-span'>Title</span>
                            </div>
                        </div>
                        <div class='form-copy-code-title'>
                            <div>
                                <img src="/img/png/des.png" alt="">
                                <span class='form-copy-code-title-span'>Description</span>
                            </div>
                        </div>
                        <div class='form-copy-code-title'>
                            <div>
                                <img src="/img/png/pf.png" alt="">
                                <span class='form-copy-code-title-span'>Button</span>
                            </div>
                        </div>
                    </div>
                    <div class="fprm-cpoy-accrdian">
                        <div class="fprm-cpoy-accrdian-icn">
                            <span>Text field</span>
                            <div class="open-chck-crsr" @click="open_checkbox">
                                <img src="/img/png/paw.png" alt="">
                            </div>

                        </div>
                    </div>
                </div>



                <div v-show="all_checkbox" class="copy-formopen-after">
                    <div v-for="(item, index) in allDetails" :key="index">
                        <div class="inside-form-chck-mrg" v-for="(field, fieldIndex) in Object.keys(item)"
                            :key="fieldIndex">
                            <input v-model="selectedFields"
                                :class="['styled-checkbox', `styled-checkbox-${index}-${fieldIndex}`]"
                                :id="`styled-checkbox-${index}-${fieldIndex}`" type="checkbox" :value="field">
                            <label :for="`styled-checkbox-${index}-${fieldIndex}`"></label>
                            <span class="check-name-iprg">{{ item[field] }}</span>
                        </div>
                    </div>
                    <button class="insert-btn" @click="insertSelectedFields">Insert</button>
                </div>

                <div class="form-copy-div-btnn">
                    <button class='jobls-btnnxt-form' @click="publishForm">Publish ></button>
                </div>

            </div>

            <div class="copy-form-right">
                <div class="copy-form-right-imprt-2sndfields">
                    <div class="copy-frm-step-single-span-txt">
                        <NuxtLink to='/admin/CopyForm/AddFamily'>
                            <div class="copy-frm-step-single">
                                <div class="copy-frm-step-single-dotted">

                                </div>
                            </div>
                        </NuxtLink>
                        <span class="step-frm-sing-stl-txt">Single Page Form</span>
                    </div>
                    <div class='copy-frm-step-single-span-txt'>
                        <div class="copy-frm-step-multiple">
                            <div class="copy-form-fill-box">
                                <span class="copy-form-fill-box-spanred"></span>
                                <span class="copy-form-fill-box-spanred"></span>
                                <span class="copy-form-fill-box-spanred"></span>
                            </div>
                            <div class="copy-form-fill-box-border">

                            </div>
                        </div>
                        <span class="step-frm-sing-stl-txt">Step Page Form</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
definePageMeta({   layout: 'admin',
  middleware: ['admin'], })

export default {
    data() {
        return {
            color: '#ffffff',
            formBackgroundColor: '#fff',
            frm_backgrd: false,
            frm_Title: false,
            frm_Label: false,
            frm_Field: false,
            frm_button: false,
            appliedColor: '#000000',
            appliedFontFamily: '',
            appliedFontSize: '30px',
            appliedFontWeight: '700',
            ColorLabel: '#0F172A',
            FontFamilyLabel: '',
            FontSizeLabel: '21px',
            FontWeightLabel: '500',
            appliedFontFamilyField: '',
            appliedFontColorField: '',
            appliedFontSizeField: '14px',
            appliedFontWeightField: '400',
            appliedBorderStyleField: '',
            appliedBorderWidthField: '',
            appliedBorderColorField: '',

            appliedFontFamilybutton: 'normal',
            appliedFontColorbutton: '#fff',
            appliedFontSizebutton: '24px',
            appliedFontWeightbutton: '500',
            appliedBorderStylebutton: 'solid',
            appliedBorderColorbutton: 'red',
            appliedBorderWidthbutton: '1px',
            appliedBorderColorbutton: '#ff5757',
            appliedbackgroundColorbutton: '#ff5757',

            all_checkbox: false,
            design_data_back: false,
            allDetails: [
                { name: 'Name' },
                { email: 'Email Id' },
                { phone: 'Phone' },
                { gender: 'Gender' },
                { dob: 'Dob' },
                { city: 'City' },
                { state: 'State' },
                { pincode: 'Pincode' },
                { country: 'Country' },
                { refusal: 'Refusal' },
                { occupation: 'Occupation' },
                { permanent_address: 'Permanent Address' },
                { correspondingaddress: 'Corresponding Address' },
                { service_country: 'Service Country' },
                { family_details: 'Family Detail' },
                { primary_education: 'Primary Education' },
                { job_details: 'Job Detail' },
                { service: 'Service ' },
            ],

            selectedFields: [],
            displayedFields: [],

        }
    },

    methods: {

        updateColor(event) {
            this.color = event.target.value;
        },
        open_formBackground() {
            this.frm_backgrd = !this.frm_backgrd
        },
        open_formTitle() {
            this.frm_Title = !this.frm_Title
        },
        open_formLabel() {
            this.frm_Label = !this.frm_Label
        },
        open_formfield() {
            this.frm_Field = !this.frm_Field
        },
        open_formbutton() {
            this.frm_button = !this.frm_button
        },
        publishForm() {
            this.formBackgroundColor = this.color;
            this.appliedFontFamily = this.fontFamily;
            this.appliedFontSize = this.fontSize;
            this.appliedFontWeight = this.fontWeight;
            this.appliedColor = this.colorTitle;
            this.FontFamilyLabel = this.fontFamilylabel;
            this.FontSizeLabel = this.fontSizelabel;
            this.FontWeightLabel = this.fontWeightlabel;
            this.ColorLabel = this.colorTitlelabel;
            this.appliedFontFamilyField = this.fontFamilyField;
            this.appliedFontSizeField = this.fontSizeField;
            this.appliedFontWeightField = this.fontWeightField;
            this.appliedFontColorField = this.colorTitleField;
            this.appliedBorderStyleField = this.BorderStyleField;
            this.appliedBorderWidthField = this.BorderWidthField;
            this.appliedBorderColorField = this.BordercolorField;

            this.appliedFontFamilybutton = this.fontFamilybutton;
            this.appliedFontSizebutton = this.fontSizebutton;
            this.appliedFontWeightbutton = this.fontWeightbutton;
            this.appliedFontColorbutton = this.colorbutton;
            this.appliedBorderStylebutton = this.BorderStylebutton;
            this.appliedBorderWidthbutton = this.BorderWidthbutton;
            this.appliedBorderColorbutton = this.Bordercolorbutton;
            this.appliedbackgroundColorbutton = this.Backgroundcolorbutton;
        },
        open_checkbox() {
            this.all_checkbox = !this.all_checkbox
        },
        insertSelectedFields() {
            this.displayedFields = [...this.selectedFields];
        },
        toggleDesign() {
            this.design_data_back = true;
            this.all_checkbox = false;
        },
        toggleSection() {
            this.design_data_back = false;
            this.all_checkbox = false;
        },
    },

};
</script>
<!-- <script>
definePageMeta({   layout: 'admin',
  middleware: ['admin'], })

export default {
    data() {
        return {
            all_checkbox: false,

        }
    },

    methods: {
        open_checkbox() {
            this.all_checkbox = !this.all_checkbox
        }

    },

};
</script> -->

<style scoped>
@import url('./style.css');
</style>