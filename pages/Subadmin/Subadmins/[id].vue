<template>
    <div class="row">
        <div v-if="subadminData" class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between items-center">
                        <div class="row items-center">
                            <div class="col">
                                <Avatar :image="subadminData.user_id.profile_image" class="mr-1" size="xlarge"
                                    shape="circle" />
                            </div>
                            <div class="col p-0">
                                <span class="mb-1 text-[24px] font-medium">{{ subadminData.user_id.name }}</span>
                                <div class="text-[19px]">({{subadminData.sudadmin_type }})</div>
                            </div>
                        </div>
                        <div>
                            <div class="flex flex-col gap-1">
                                <span>Give Access</span>
                                <FormKit type=select :options="['Subadmin Role','Counsellor']"
                                    style="width: 250px;padding-left: 30px;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-12 mt-3" v-if="subadminData">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between items-center">
                        <span class="text-[20px] mb-0 ml-1">My Business</span>
                        <div>
                            <InputSwitch v-model="businessChecked" @update:modelValue="toggleAllBusiness($event)"  class="mt-2" />
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Access Name</th>
                                <th scope="col">View </th>
                                <th scope="col">Create </th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Business Profile</td>
                                <td>
                                    <InputSwitch v-model="subadminData.business_profile.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.business_profile.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.business_profile.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.business_profile.delete" class="mt-2" />
                                </td>
                            </tr>

                            <tr>
                                <td>Gallery Image</td>
                                <td>
                                    <InputSwitch v-model="subadminData.gallery.image.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.gallery.image.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.gallery.image.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.gallery.image.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Gallery Video</td>
                                <td>
                                    <InputSwitch v-model="subadminData.gallery.video.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.gallery.video.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.gallery.video.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.gallery.video.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Service</td>
                                <td>
                                    <InputSwitch v-model="subadminData.service.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.service.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.service.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.service.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Testimonials</td>
                                <td>
                                    <InputSwitch v-model="subadminData.achievers.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.achievers.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.achievers.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.achievers.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Blogs</td>
                                <td>
                                    <InputSwitch v-model="subadminData.blogs.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.blogs.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.blogs.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.blogs.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Appointment</td>
                                <td>
                                    <InputSwitch v-model="subadminData.appointment.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.appointment.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.appointment.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.appointment.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Events</td>
                                <td>
                                    <InputSwitch v-model="subadminData.events.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.events.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.events.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.events.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Agreement</td>
                                <td>
                                    <InputSwitch v-model="subadminData.agreement.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.agreement.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.agreement.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.agreement.delete" class="mt-2" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="col-sm-12 mt-3" v-if="subadminData">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between items-center">
                        <span class="text-[20px] mb-0 ml-1">CRM</span>
                        <div>
                            <InputSwitch v-model="crmChecked" @update:modelValue="toggleAllCRM( $event)" class="mt-2" />
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Access Name</th>
                                <th scope="col">View </th>
                                <th scope="col">Create </th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Leads</td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Campaign</td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.campaign.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.campaign.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.campaign.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.campaign.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Lead Integration</td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.lead_integration.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.lead_integration.add" class="mt-2" />
                                </td>
                                <td></td>
                                <td></td>

                            </tr>
                            <tr>
                                <td>Leads Documents</td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.documents.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.documents.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.documents.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.documents.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Leads Recommendation</td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.recommendation.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.recommendation.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.recommendation.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.recommendation.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Leads Appointment</td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.appointment.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.appointment.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.appointment.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.appointment.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Leads Agreements</td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.agreements.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.agreements.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.agreements.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.agreements.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Leads Comments</td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.comments.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.comments.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.comments.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.comments.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Leads Invoice</td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.invoice.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.invoice.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.invoice.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.leads.invoice.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Customer</td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Customers Documents</td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.documents.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.documents.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.documents.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.documents.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Customers Recommendation</td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.recommendation.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.recommendation.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.recommendation.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.recommendation.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Customers Appointment</td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.appointment.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.appointment.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.appointment.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.appointment.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Customers Agreements</td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.agreements.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.agreements.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.agreements.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.agreements.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Customers Comments</td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.comments.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.comments.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.comments.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.comments.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Customers Invoice</td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.invoice.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.invoice.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.invoice.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.customer.invoice.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Payments</td>
                                <td>
                                    <InputSwitch v-model="subadminData.payments.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.payments.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.payments.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.payments.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>WorkFlow</td>
                                <td>
                                    <InputSwitch v-model="subadminData.workFlow.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.workFlow.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.workFlow.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.workFlow.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Forms</td>
                                <td>
                                    <InputSwitch v-model="subadminData.forms.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.forms.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.forms.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.forms.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Todos</td>
                                <td>
                                    <InputSwitch v-model="subadminData.todos.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.todos.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.todos.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.todos.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Explore Plan</td>
                                <td>
                                    <InputSwitch v-model="subadminData.explore_plan.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.explore_plan.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.explore_plan.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.explore_plan.delete" class="mt-2" />
                                </td>
                            </tr>
                            <!-- <tr>
                                <td>Pipeline</td>
                                <td>
                                    <InputSwitch v-model="subadminData.pipeline.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.pipeline.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.pipeline.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.pipeline.delete" class="mt-2" />
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-sm-12 mt-3" v-if="subadminData">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between items-center">
                        <span class="text-[20px] mb-0 ml-1">Notification</span>
                        <div>
                            <InputSwitch v-model="notificationChecked"  @update:modelValue="toggleAll(subadminData.notification, $event)" class="mt-2" />
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Access Name</th>
                                <th scope="col">View </th>
                                <th scope="col">Create </th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>Email Campaign</td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_campaign.view"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_campaign.add"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_campaign.edit"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_campaign.delete"
                                        class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Email Composer</td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_composer.view"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_composer.add"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_composer.edit"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_composer.delete"
                                        class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Email Template</td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_template.view"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_template.add"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_template.edit"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_template.delete"
                                        class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td> Email Contact List</td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.Contact_List.view"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.Contact_List.add"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.Contact_List.edit"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.Contact_List.delete"
                                        class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Email Setting</td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_setting.view"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_setting.add"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_setting.edit"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.email.email_setting.delete"
                                        class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Whatsapp Broadcast</td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.broadcast.view"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.broadcast.add"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.broadcast.edit"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.broadcast.delete"
                                        class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Whatsapp Campaign</td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.campaign.view"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.campaign.add"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.campaign.edit"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.campaign.delete"
                                        class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Whatsapp Flow</td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.flow.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.flow.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.flow.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.flow.delete"
                                        class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td>Whatsapp Templates</td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.my_template.view"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.my_template.add"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.my_template.edit"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.notification.whatsapp.my_template.delete"
                                        class="mt-2" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-sm-12 mt-3" v-if="subadminData">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between items-center">
                        <span class="text-[20px] mb-0 ml-1">Settings</span>
                        <div>
                            <InputSwitch v-model="settingsChecked"  @update:modelValue="toggleAll(subadminData.setting, $event)" class="mt-2" />
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Access Name</th>
                                <th scope="col">View </th>
                                <th scope="col">Create </th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Lead Management Setting</td>
                                <td>
                                    <InputSwitch v-model="subadminData.setting.lead_mangement.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.setting.lead_mangement.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.setting.lead_mangement.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.setting.lead_mangement.delete" class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td> Customer Management Setting</td>
                                <td>
                                    <InputSwitch v-model="subadminData.setting.customer_management.view" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.setting.customer_management.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.setting.customer_management.edit" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.setting.customer_management.delete"
                                        class="mt-2" />
                                </td>
                            </tr>
                            <tr>
                                <td> User & Role Management Setting</td>
                                <td>
                                    <InputSwitch v-model="subadminData.setting.user_role_management.view"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.setting.user_role_management.add" class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.setting.user_role_management.edit"
                                        class="mt-2" />
                                </td>
                                <td>
                                    <InputSwitch v-model="subadminData.setting.user_role_management.delete"
                                        class="mt-2" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <center>
            <button class="btn btn-primary mt-4" @click="update">Update Permissions</button>
        </center>
    </div>
</template>

<script>
definePageMeta({
    layout: 'subadmin',
    middleware: ['subadmin'],
})

export default {
    props: ["subadminData"],
    data() {
        return {
            notificationChecked: false,
            settingsChecked: false,
            businessChecked:false,
            crmChecked:false,
            subadminData: null,
            loading: false
        }
    },
      beforeUnmount() {
  localStorage.setItem("switchStates", JSON.stringify({
    notificationChecked: this.notificationChecked,
    settingsChecked: this.settingsChecked,
    crmChecked: this.crmChecked,
    businessChecked: this.businessChecked,
  }))
},
    async mounted() {
        activateMenu('settings', 'Subadmins', true);
        this.init();
         const saved = localStorage.getItem("switchStates")
  if (saved) {
    Object.assign(this, JSON.parse(saved))
  }
    },
    methods: {
        async init() {
            this.loading = true
            await subadminGet(`/admin-subadmins/${this.$route.params.id}`).then((response) => {
                this.subadminData = response.data.emp;
            });
            this.loading = false
        },
        async update() {
            this.loading = true
            await subadminPut(`/admin-subadmins/${this.$route.params.id}`, this.subadminData).then((response) => {
                useNuxtApp().$makeSubadminreload(this.subadminData.user_id._id);
                successAlert("Subadmin Updated")
            });
            this.loading = false
        },
        toggleAll(obj, value) {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          this.toggleAll(obj[key], value)
        } else {
          obj[key] = value
        }
      }
    },
    toggleAllCRM(value) {
      const crmModules = [
        this.subadminData.leads,
        this.subadminData.customer,
        this.subadminData.payments,
        this.subadminData.workFlow,
        this.subadminData.forms,
        this.subadminData.todos,
        this.subadminData.explore_plan,
        this.subadminData.pipeline
      ]
      crmModules.forEach(mod => {
        if (mod) this.toggleAll(mod, value)
      })
    },
     toggleAllBusiness(value) {
    const businessModules = [
      this.subadminData.business_profile,
      this.subadminData.gallery?.image,
      this.subadminData.gallery?.video,
      this.subadminData.service,
      this.subadminData.achievers,
      this.subadminData.blogs,
      this.subadminData.appointment,
      this.subadminData.events,
      this.subadminData.agreement
    ]
    businessModules.forEach(mod => mod && this.toggleAll(mod, value))
  }
    }
}
</script>

<style scoped>
@import url('style.css');
</style>