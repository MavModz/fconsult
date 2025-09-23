<template>

    <center class="mt-5">Your Invoice Is Being Downloaded</center>

    <div class="mb-5 d-none">
        <div ref="pdfSection" id="pdfSections">
            <div class="main">

                <h3 style="margin-bottom: 20px;margin-top: 20px;text-align: center;"><u>Tax Invoice</u></h3>

                <div style="display: flex;margin-bottom: 20px;">
                    <div class="div1">
                        <img width="211" height="61" src="https://findandconsult.com/img/png/logo.png">
                    </div>
                    <div class="div2">
                        <p style="text-indent: 0pt;text-align: center;">NRICH LEARNING PRIVATE LIMITED</p>
                        <p style="padding-top: 2pt;text-indent: 0pt;text-align: center;">Sco 128-129, Sector-8C,
                            Chandigarh
                            160009 INDIA</p>
                        <p style="padding-top: 2pt;text-indent: 0pt;text-align: center;">7942530235</p>
                        <p style="padding-top: 2pt;text-indent: 0pt;text-align: center;">
                            <a href="mailto:admin@findandconsult.com">admin@findandconsult.com</a>
                        </p>
                    </div>
                    <div class="div3">
                        <p style="text-indent: 0pt;text-align: right;">GSTIN: 04AAHCN5200L1ZM</p>
                        <p style="text-indent: 0pt;text-align: right;">PAN: AACHN5300L</p>
                    </div>
                </div>
                <table style="border-collapse:collapse;margin-left:6pt;" cellspacing="0">
                    <thead>
                        <tr style="height:16pt">
                        <td
                            style="width:91pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt">
                            <p class="s1" style="padding-top: 2pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">Company Name</p>
                        </td>
                        <td style="width:18pt;border-top-style:solid;border-top-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-right: 3pt;text-indent: 0pt;text-align: right;">:</p>
                        </td>
                        <td
                            style="width:167pt;border-top-style:solid;border-top-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1" style="padding-top: 2pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                                {{ data.invoice.company_id.company_name }}
                            </p>
                        </td>
                        <td
                            style="width:84pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt">
                            <p class="s1" style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;text-align: left;">
                                Invoice
                                No.</p>
                        </td>
                        <td
                            style="width:191pt;border-top-style:solid;border-top-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 17pt;text-indent: 0pt;text-align: left;">:
                                FC2425INV1</p>
                        </td>
                    </tr>
                    <tr style="height:14pt">
                        <td style="width:91pt;border-left-style:solid;border-left-width:1pt">
                            <p class="s1" style="padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">Company Address</p>
                        </td>
                        <td style="width:18pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-right: 3pt;text-indent: 0pt;text-align: right;">:</p>
                        </td>
                        <td style="width:167pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1" style="padding-top: 1pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                                {{ data.invoice.company_id.address }}</p>
                        </td>
                        <td style="width:84pt;border-left-style:solid;border-left-width:1pt">
                            <p class="s1" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: left;">
                                Invoice
                                Date</p>
                        </td>
                        <td style="width:191pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-left: 17pt;text-indent: 0pt;text-align: left;">:
                                {{ data?.invoice?.createdAt?.split('T')[0] }}</p>
                        </td>
                    </tr>
                    <tr style="height:14pt">
                        <td style="width:91pt;border-left-style:solid;border-left-width:1pt">
                            <p class="s1" style="padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;text-align: left;">
                                Mobile
                                Number</p>
                        </td>
                        <td style="width:18pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-right: 3pt;text-indent: 0pt;text-align: right;">:</p>
                        </td>
                        <td style="width:167pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1" style="padding-top: 1pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                                {{ data.invoice.company_id.phone }}</p>
                        </td>
                        <td style="width:84pt;border-left-style:solid;border-left-width:1pt">
                            <p class="s1" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: left;">
                                GSTIN/UIN</p>
                        </td>
                        <td style="width:191pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-left: 17pt;text-indent: 0pt;text-align: left;">:</p>
                        </td>
                    </tr>
                    <tr style="height:13pt">
                        <td
                            style="width:91pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-left: 2pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                POS</p>
                        </td>
                        <td style="width:18pt;border-bottom-style:solid;border-bottom-width:1pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-right: 3pt;text-indent: 0pt;line-height: 10pt;text-align: right;">
                                :</p>
                        </td>
                        <td
                            style="width:167pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-left: 3pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                Chandigarh</p>
                        </td>
                        <td
                            style="width:84pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                Billing Address</p>
                        </td>
                        <td
                            style="width:191pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 1pt;padding-left: 17pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                : 160101, Chandigarh, India</p>
                        </td>
                    </tr>
                        </thead>
                </table>
                <p style="text-indent: 0pt;text-align: left;">
                    <br>
                </p>
                <table style="border-collapse:collapse;margin-left:6pt;width: 739px;" cellspacing="0">
                    <thead>
                        <tr style="height:24pt">
                        <td style="width:30pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            bgcolor="#BFBFBF">
                            <p class="s1" style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;text-align: left;">
                                SN</p>
                        </td>
                        <td style="width:94pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            bgcolor="#BFBFBF">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;padding-right: 29pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                Description of Service</p>
                        </td>
                        <td style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            bgcolor="#BFBFBF">
                            <p class="s1" style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;text-align: left;">
                                SAC-Code
                            </p>
                        </td>
                        <td style="width:60pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            bgcolor="#BFBFBF">
                            <p class="s1" style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;text-align: left;">
                                Amount
                            </p>
                        </td>
                        <td style="width:35pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            bgcolor="#BFBFBF">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 11pt;text-align: left;">
                                CGST</p>
                            <p class="s1" style="padding-left: 1pt;text-indent: 0pt;line-height: 9pt;text-align: left;">
                                Rate</p>
                        </td>
                        <td style="width:48pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            bgcolor="#BFBFBF">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 11pt;text-align: left;">
                                CGST</p>
                            <p class="s1" style="padding-left: 1pt;text-indent: 0pt;line-height: 9pt;text-align: left;">
                                Amount
                            </p>
                        </td>
                        <td style="width:35pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            bgcolor="#BFBFBF">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 11pt;text-align: left;">
                                SGST</p>
                            <p class="s1" style="padding-left: 1pt;text-indent: 0pt;line-height: 9pt;text-align: left;">
                                Rate</p>
                        </td>
                        <td style="width:47pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            bgcolor="#BFBFBF">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 11pt;text-align: left;">
                                SGST</p>
                            <p class="s1" style="padding-left: 1pt;text-indent: 0pt;line-height: 9pt;text-align: left;">
                                Amount
                            </p>
                        </td>
                        <td style="width:36pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            bgcolor="#BFBFBF">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 11pt;text-align: left;">
                                IGST</p>
                            <p class="s1" style="padding-left: 1pt;text-indent: 0pt;line-height: 9pt;text-align: left;">
                                Rate</p>
                        </td>
                        <td style="width:47pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            bgcolor="#BFBFBF">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 11pt;text-align: left;">
                                IGST</p>
                            <p class="s1" style="padding-left: 1pt;text-indent: 0pt;line-height: 9pt;text-align: left;">
                                Amount
                            </p>
                        </td>
                        <td style="width:65pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            bgcolor="#BFBFBF">
                            <p class="s1" style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;text-align: left;">
                                Total
                                Amount</p>
                        </td>
                    </tr>
                    <tr style="height:14pt">
                        <td
                            style="width:30pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                1</p>
                        </td>
                        <td
                            style="width:94pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                CRM</p>
                        </td>
                        <td
                            style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                998314</p>
                        </td>
                        <td
                            style="width:60pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                30000.00</p>
                        </td>
                        <td
                            style="width:35pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                9.0</p>
                        </td>
                        <td
                            style="width:48pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                2700.00</p>
                        </td>
                        <td
                            style="width:35pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                9.0</p>
                        </td>
                        <td
                            style="width:47pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                2700.00</p>
                        </td>
                        <td
                            style="width:36pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                0.0</p>
                        </td>
                        <td
                            style="width:47pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                0.0</p>
                        </td>
                        <td
                            style="width:65pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                35400.00</p>
                        </td>
                    </tr>
                    <tr style="height:16pt">
                        <td style="width:402pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt"
                            colspan="8">
                            <p class="s2"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 11pt;text-align: left;">
                                Company’s Bank Detail</p>
                        </td>
                        <td style="width:83pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            colspan="2" rowspan="2">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;padding-right: 31pt;text-indent: 0pt;line-height: 121%;text-align: left;">
                                Total (INR) Total Tax</p>
                        </td>
                        <td style="width:65pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            rowspan="2">
                            <p class="s1"
                                style="padding-top: 2pt;padding-right: 1pt;text-indent: 0pt;text-align: right;">
                                30000.00
                            </p>
                            <p class="s1"
                                style="padding-top: 2pt;padding-right: 1pt;text-indent: 0pt;line-height: 11pt;text-align: right;">
                                5400.00</p>
                            <p class="s1"
                                style="padding-right: 1pt;text-indent: 0pt;line-height: 9pt;text-align: right;">
                            </p>
                        </td>
                    </tr>
                    <tr style="height:23pt">
                        <td style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt"
                            colspan="2" rowspan="2">
                            <p class="s1" style="padding-left: 1pt;text-indent: 0pt;text-align: left;">Bank Name</p>
                            <p style="text-indent: 0pt;text-align: left;">
                                <br>
                            </p>
                            <p class="s1" style="padding-left: 1pt;text-indent: 0pt;text-align: left;">A/C No.</p>
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                Branch &amp; IFSC Code</p>
                        </td>
                        <td style="width:297pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            colspan="6" rowspan="2">
                            <p class="s1"
                                style="padding-top: 1pt;padding-left: 21pt;text-indent: 0pt;text-align: left;">: ICICI
                                BANK LIMITED</p>
                            <p style="text-indent: 0pt;text-align: left;">
                                <br>
                            </p>
                            <p class="s1" style="padding-left: 21pt;text-indent: 0pt;text-align: left;">: 078205001234
                            </p>
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 21pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                : ICIC0000782</p>
                        </td>
                    </tr>
                    <tr style="height:28pt">
                        <td style="width:83pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            colspan="2">
                            <p class="s1"
                                style="padding-left: 1pt;padding-right: 27pt;text-indent: 0pt;line-height: 14pt;text-align: left;">
                                Grand Total (INR)</p>
                        </td>
                        <td
                            style="width:65pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-right: 1pt;text-indent: 0pt;text-align: right;">
                                35400.00
                            </p>
                        </td>
                    </tr>
                    <tr style="height:20pt">
                        <td style="width:550pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            colspan="11">
                            <p class="s1" style="padding-top: 5pt;padding-left: 1pt;text-indent: 0pt;text-align: left;">
                                INR (in
                                words) : THIRTY FIVE THOUSAND FOUR HUNDRED</p>
                        </td>
                    </tr>
                    <tr style="height:14pt">
                        <td style="width:550pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt"
                            colspan="11">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br>
                            </p>
                        </td>
                    </tr>
                    <tr style="height:50pt">
                        <td style="width:485pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            colspan="10">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br>
                            </p>
                        </td>
                        <td
                            style="width:65pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p class="s1"
                                style="padding-top: 2pt;padding-right: 1pt;text-indent: 0pt;text-align: right;">E
                                .&amp;.O.E</p>
                        </td>
                    </tr>
                    <tr style="height:16pt">
                        <td style="width:178pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-right-style:solid;border-right-width:1pt"
                            colspan="3">
                            <p class="s2"
                                style="padding-top: 2pt;padding-left: 1pt;text-indent: 0pt;line-height: 11pt;text-align: left;">
                                Customer&#39;s Seal and Signature</p>
                        </td>
                        <td style="width:94pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            colspan="2" rowspan="2">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br>
                            </p>
                        </td>
                        <td style="width:278pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                            colspan="6" rowspan="2">
                            <p class="s1"
                                style="padding-top: 2pt;padding-left: 105pt;text-indent: 0pt;text-align: left;">For
                                NRICH LEARNING PRIVATE LIMITED</p>
                            <p style="text-indent: 0pt;text-align: left;">
                                <br>
                            </p>
                            <p class="sign" style="text-indent: 0pt;text-align: right;">


                                <img width="130" height="45"
                                    src="data:image/jpg;base64,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">


                            </p>
                            <p class="s1"
                                style="padding-top: 8pt;padding-left: 183pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                                Authorised Signatory</p>
                        </td>
                    </tr>
                    <tr style="height:63pt">
                        <td style="width:136pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt"
                            colspan="3">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br>
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
const data = (await homeGet(`/fcinvoice/${useRoute().params.id}`)).data.data
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