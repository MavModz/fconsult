<template>

    <center class="mt-5">Your Invoice Is Being Downoaded</center>

    <div class="mb-5 d-none">
        <div ref="pdfSection" id="pdfSections">
            <div class="main">

                <h1 class="m-4" style="position: relative;left: 300px;">EMI STRUCTURE</h1>

                <table style="margin-left:5.38761pt;width: 753px;">
                    <thead>
                        <tr>
                        <td rowspan="5">
                            <img :src="data.invoice.company_id.symbol" alt="" style="height: 122px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right;padding-right: 10px">{{ data.invoice.company_id.company_name }}
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right;padding-right: 10px">{{ data.invoice.company_id.phone }}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;padding-right: 10px">{{ data.invoice.company_id.company_email }}
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: right;padding-right: 10px">{{ data.invoice.company_id.city }} ,
                            {{ data.invoice.company_id.state }}</td>
                    </tr>
                    <tr>
                        <td style="padding-left: 10px;">GSTIN : {{ data.invoice.company_id.company_gst }}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style="padding-left: 10px;">PAN : {{ data.invoice.company_id.pan }}</td>
                        <td style="text-align: right;padding-right: 10px;">{{ data.invoice.invoice_number }}</td>
                    </tr>
                        </thead>
                </table>


                <p style="padding-top: 3pt;text-indent: 0pt;text-align: left;"><br /></p>
                <table style="width: 753px;border-collapse:collapse;margin-left:5.38761pt" cellspacing="0">
                    <thead>
                        <tr style="height:18pt">
                        <td
                            style="width:256pt;border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-left-color:#808080;border-bottom-style:solid;border-bottom-width:1pt;border-bottom-color:#808080;border-right-style:solid;border-right-width:1pt;border-right-color:#808080">
                            <p class="s1" style="padding-top: 1pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                                Billing
                                Address</p>
                        </td>
                        <td
                            style="width:278pt;border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-left-color:#808080;border-bottom-style:solid;border-bottom-width:1pt;border-bottom-color:#808080;border-right-style:solid;border-right-width:1pt;border-right-color:#808080">
                            <p class="s1" style="padding-top: 1pt;padding-left: 4pt;text-indent: 0pt;text-align: left;">
                                Shipping
                                address</p>
                        </td>
                    </tr>
                    <tr style="height:90pt">
                        <td
                            style="width:256pt;border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-left-color:#808080;border-bottom-style:solid;border-bottom-width:1pt;border-bottom-color:#808080;border-right-style:solid;border-right-width:1pt;border-right-color:#808080">
                            <p class="s1" style="padding-top: 1pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                                {{
                                    data.invoice.billing.name }}</p>
                            <p class="s1" style="padding-top: 1pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                                {{
                                    data.invoice.billing.company }}</p>
                            <p class="s1" style="padding-top: 1pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                                {{
                                    data.invoice.billing.cityState }}</p>
                            <p class="s1" style="padding-top: 1pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                                {{
                                    data.invoice.billing.phone }}</p>
                            <p class="s1" style="padding-top: 1pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                                {{
                                    data.invoice.billing.email }}</p>
                        </td>
                        <td
                            style="width:278pt;border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-left-color:#808080;border-bottom-style:solid;border-bottom-width:1pt;border-bottom-color:#808080;border-right-style:solid;border-right-width:1pt;border-right-color:#808080">
                            <p class="s1" style="padding-top: 1pt;padding-left: 4pt;text-indent: 0pt;text-align: left;">
                                {{
                                    data.invoice.shipping.name }}</p>
                            <p class="s1" style="padding-top: 1pt;padding-left: 4pt;text-indent: 0pt;text-align: left;">
                                {{
                                    data.invoice.shipping.company }}</p>
                            <p class="s1" style="padding-top: 1pt;padding-left: 4pt;text-indent: 0pt;text-align: left;">
                                {{
                                    data.invoice.shipping.cityState }}</p>
                            <p class="s1" style="padding-top: 1pt;padding-left: 4pt;text-indent: 0pt;text-align: left;">
                                {{
                                    data.invoice.shipping.phone }}</p>
                            <p class="s1" style="padding-top: 1pt;padding-left: 4pt;text-indent: 0pt;text-align: left;">
                                {{
                                    data.invoice.shipping.email }}</p>
                        </td>
                    </tr>
                        </thead>
                </table>
                <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
                <table style="width: 753px;border-collapse:collapse;margin-left:5.38761pt" cellspacing="0">
                    <thead>
                        <tr style="height:18pt">
                        <td
                            style="width:117pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Service Name
                            </p>
                        </td>
                        <td
                            style="width:151pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Service
                                Country</p>
                        </td>
                        <td
                            style="width:137pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Service
                                Listing</p>
                        </td>
                        <td
                            style="width:129pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">Date
                                Time
                            </p>
                        </td>
                    </tr>
                    <tr style="height:13pt">
                        <td
                            style="width:117pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="text-indent: 0pt;text-align: center;">{{
                                data.invoice.service_listing.service_name }}</p>
                        </td>
                        <td
                            style="width:151pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="text-indent: 0pt;text-align: center;">{{
                                data.invoice.service_listing.country }}</p>
                        </td>
                        <td
                            style="width:137pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="text-indent: 0pt;text-align: center;">{{
                                data.invoice.service_listing.title }}</p>
                        </td>
                        <td
                            style="width:129pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="padding-left: 1pt;text-indent: 0pt;text-align: center;">{{
                                data.invoice.service_listing.created_at }}
                            </p>
                        </td>
                    </tr>
                        </thead>
                </table>
                <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                <table style="width: 753px;border-collapse:collapse;margin-left:5.38761pt" cellspacing="0">
                    <thead>
                        <tr style="height:18pt">
                        <td
                            style="width:125pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Payment Mode
                            </p>
                        </td>
                        <td
                            style="width:131pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Payment Type
                            </p>
                        </td>
                        <td
                            style="width:80pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Payment Date
                            </p>
                        </td>
                        <td
                            style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">
                                Payment
                                Amount
                            </p>
                        </td>
                        <td
                            style="width:93pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">
                                Total EMI
                            </p>
                        </td>
                    </tr>
                    <tr style="height:13pt">
                        <td
                            style="width:125pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="text-indent: 0pt;text-align: center;">{{
                                data.invoice.payment_method }}</p>
                        </td>
                        <td
                            style="width:131pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="text-indent: 0pt;text-align: center;">EMI</p>
                        </td>
                        <td
                            style="width:80pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="text-indent: 0pt;text-align: center;">{{
                                data.invoice.created_at.split("T")[0] }}</p>
                        </td>
                        <td
                            style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="padding-left: 1pt;text-indent: 0pt;text-align: center;">{{
                                data.invoice.total_amount }}</p>
                        </td>
                        <td
                            style="width:93pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="padding-left: 1pt;text-indent: 0pt;text-align: center;">{{
                                data.invoice.emi.length }}</p>
                        </td>
                    </tr>
                    </thead>
                </table>

                <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                <table style="width: 753px;border-collapse:collapse;margin-left:5.38761pt" cellspacing="0">
                    <thead>
                        <tr style="height:18pt">
                        <td
                            style="width:125pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Emi Mode</p>
                        </td>
                        <td
                            style="width:131pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Emi Status
                            </p>
                        </td>
                        <td
                            style="width:80pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">Emi Date</p>
                        </td>
                        <td
                            style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">Emi
                                Amount
                            </p>
                        </td>
                        <td
                            style="width:93pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">Emi
                                Ref
                            </p>
                        </td>
                    </tr>
                    <tr style="height:13pt" v-for="i in data.invoice.emi">
                        <td
                            style="width:125pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="text-indent: 0pt;text-align: center;">{{ i.method }}</p>
                        </td>
                        <td
                            style="width:131pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="text-indent: 0pt;text-align: center;">{{ i.status }}</p>
                        </td>
                        <td
                            style="width:80pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="text-indent: 0pt;text-align: center;">{{ i.date.split("T")[0] }}
                            </p>
                        </td>
                        <td
                            style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="padding-left: 1pt;text-indent: 0pt;text-align: center;">{{
                                i.subtotal }}</p>
                        </td>
                        <td
                            style="width:93pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3" style="padding-left: 1pt;text-indent: 0pt;text-align: center;">{{
                                i.reference }}</p>
                        </td>
                    </tr>
                    </thead>
                </table>

                <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                <table style="border-collapse:collapse;margin-left:5.38761pt" cellspacing="0">
                    <thead>
                        <tr style="height:13pt">
                        <td
                            style="width:320pt;border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-left-color:#808080;border-right-style:solid;border-right-width:1pt;border-right-color:#808080">
                            <p class="s4" style="padding-left: 3pt;text-indent: 0pt;text-align: left;">Company’s
                                Bank Detail</p>
                        </td>
                        <td
                            style="width:111pt;border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-left-color:#808080;border-bottom-style:solid;border-bottom-width:1pt;border-bottom-color:#808080;border-right-style:solid;border-right-width:1pt;border-right-color:#808080">
                            <p class="s3" style="padding-left: 4pt;text-indent: 0pt;text-align: left;">Total (INR)
                            </p>
                        </td>
                        <td style="width:103pt;text-align: right;border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-left-color:#808080;border-bottom-style:solid;border-bottom-width:1pt;border-bottom-color:#808080;border-right-style:solid;border-right-width:1pt;border-right-color:#808080"
                            rowspan="2">
                            <p class="s3"
                                style="padding-right: 3pt;text-indent: 0pt;text-align: right;padding-right: 10px;">
                                {{ data.invoice.subtotal_amount }}</p>
                            <p v-if="!data.invoice.isIGST" class="s3"
                                style="padding-top: 4pt;padding-left: 39pt;text-indent: 0pt;text-align: right;padding-right: 10px;">
                                (9 % CGST + 9 % SGST )
                                {{ data.invoice.total_amount - data.invoice.subtotal_amount }}</p>
                            <p v-else class="s3"
                                style="padding-top: 4pt;padding-left: 39pt;text-indent: 0pt;text-align: right;padding-right: 10px;">
                                ({{ data.invoice.tax }}%IGST)
                                {{ data.invoice.total_amount - data.invoice.subtotal_amount }}</p>
                        </td>
                    </tr>
                    <tr style="height:13pt">
                        <td style="width:320pt;border-left: rgb(128, 128, 128);border-bottom: rgb(128, 128, 128);border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt;border-right-color:#808080"
                            rowspan="3">
                            <p class="s3" style="padding-left: 3pt;text-indent: 0pt;text-align: left;">Bank Name :
                                {{ data.settings.bank_name }}
                            </p>
                            <p class="s3" style="padding-top: 5pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                                Account
                                Number : <span class="s5"> </span>{{ data.settings.bank_acc }}</p>
                            <p class="s3" style="padding-top: 5pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                                Branch
                                &amp;
                                IFSC Code : {{ data.settings.bank_ifsc }}</p>
                        </td>
                        <td
                            style="width:111pt;border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-left-color:#808080;border-bottom-style:solid;border-bottom-width:1pt;border-bottom-color:#808080;border-right-style:solid;border-right-width:1pt;border-right-color:#808080">
                            <p class="s3" style="padding-left: 4pt;text-indent: 0pt;text-align: left;">Total Tax</p>
                        </td>
                    </tr>
                    <tr style="height:15pt">
                        <td
                            style="width:111pt;border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-left-color:#808080;border-bottom-style:solid;border-bottom-width:1pt;border-bottom-color:#808080;border-right-style:solid;border-right-width:1pt;border-right-color:#808080">
                            <p class="s3" style="padding-top: 1pt;padding-left: 4pt;text-indent: 0pt;text-align: left;">
                                Remaining
                                Amount</p>
                        </td>
                        <td style="border-bottom: rgb(128, 128, 128);width:103pt;border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-left-color:#808080;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt;border-right-color:#808080"
                            rowspan="2">
                            <p class="s6"
                                style="padding-top: 3pt;padding-left: 42pt;text-indent: 0pt;text-align: right;padding-right: 10px;">
                                {{ data.invoice.total_amount }}
                            </p>
                        </td>
                    </tr>
                    <tr style="height:15pt">
                        <td
                            style="width:111pt;border-bottom: rgb(128, 128, 128);border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-left-color:#808080;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt;border-right-color:#808080">
                            <p class="s3" style="padding-top: 1pt;padding-left: 4pt;text-indent: 0pt;text-align: left;">
                                (INR)
                            </p>
                        </td>
                    </tr>
                    <tr style="height:15pt">
                        <td style="border: rgb(128, 128, 128);width:534pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-bottom-color:#808080;border-right-style:solid;border-right-width:1pt"
                            colspan="3">
                            <p class="s7" style="padding-top: 1pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                                INR
                                (in
                                words) <span class="s8">: ELEVEN THOUSAND, ONE HUNDRED SIXTY</span></p>
                        </td>
                    </tr>
                    <tr style="height:60pt">
                        <td style="width:534pt;border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-left-color:#808080;border-bottom-style:solid;border-bottom-width:1pt;border-bottom-color:#808080;border-right-style:solid;border-right-width:1pt;border-right-color:#808080"
                            colspan="3">
                            <p class="s9" style="padding-left: 3pt;text-indent: 0pt;text-align: left;">Terms And
                                Condition</p>
                            <ul id="l1">
                                <li data-list-text="•">
                                    <p class="s3"
                                        style="padding-top: 8pt;padding-left: 19pt;text-indent: -5pt;text-align: left;">
                                        All cheques and Payments will be in the Name of Nrich Learning Pvt Ltd.</p>
                                </li>
                                <li data-list-text="•">
                                    <p class="s3"
                                        style="padding-top: 3pt;padding-left: 19pt;text-indent: -5pt;text-align: left;">
                                        The Project will start once payment for the quoted amount has been received
                                        by
                                        TechGlide.
                                    </p>
                                </li>
                                <li data-list-text="•">
                                    <p class="s3"
                                        style="padding-top: 3pt;padding-left: 19pt;text-indent: -5pt;text-align: left;">
                                        Any changes requested by the Client after work has commenced may incur
                                        additional
                                        charges.
                                    </p>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr style="height:102pt">
                        <td
                            style="width:206pt;border: rgb(128, 128, 128);border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s3"
                                style="padding-left: 10px;text-indent: 0pt;text-align: left;position: relative;bottom: -50px;">
                                This Is A Computer
                                Generated
                                Invoice</p>
                        </td>
                        <td
                            style="width:114pt;border: rgb(128, 128, 128);border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p style="text-indent: 0pt;text-align: left;"><br /></p>
                        </td>
                        <td
                            style="position: relative;;width:214pt;border-top-style:solid;border-top-width:1pt;border-top-color:#808080;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-bottom-color:#808080;border-right-style:solid;border-right-width:1pt;border-right-color:#808080">
                            <p class="s3" style="padding-right: 10px;text-indent: 0pt;text-align: right;">For
                                {{ data.invoice.company_id.company_name }}</p>
                            <p style="text-indent: 0pt;text-align: left;text-align: right;float: right;"><span>
                                    <table border="0" cellspacing="0" cellpadding="0">
                                        <thead>
                                            <tr>
                                            <td><img style="padding-right: 10px;height: 100px;width: 100px;"
                                                    :src="data.invoice.company_id.symbol" />
                                            </td>
                                        </tr>
                                            </thead>
                                    </table>
                                </span></p>
                            <p class="s3"
                                style="padding-right: 10px;text-indent: 0pt;text-align: right;position: absolute;bottom: 0;right: 0;padding-bottom: 10px;">
                                Authorised Signatory
                            </p>
                        </td>
                    </tr>
                    </thead>
                </table>

            </div>
        </div>
    </div>

    <button ref="pdfEmiBtn" @click="exportToPDF(
        'invoice.pdf',
        pdfSection,
        { orientation: 'p', format: 'a4', putOnlyUsedFonts: true, }
    )">
    </button>

    <!-- ! INVOICE EMI -->
</template>


<script setup>
const pdfSection = ref(null);
const data = (await homeGet(`/invoice/${useRoute().params.id}`)).data.data

</script>


<script>
// import numberToWords from 'number-to-words';


export default {
    name: 'Payments',
    data() {
        return {
            data: {
                company_id: {}, billing: {}, shipping: {}, service_listing: {}, created_at: "0T0", emi: [], bank: {}
            },
            loading: { a: true, b: false, c: false },
            payments: null,
            route: useRoute()
        }
    },

    async mounted() {
        await this.downloadEmiInvoice(this.$route.params.id, this.$route.params.n)
    },
    methods: {

        async downloadEmiInvoice(id, i) {
            this.$refs.pdfEmiBtn.click();
        },

    },
}
</script>

<style scoped>
@import url('style.css');
</style>