<template>
    <div class="program-modal">
        <div class="modal-header">
            <h1>Program name</h1>
            <button class="close-btn">&times;</button>
        </div>
        <p class="tuition-fee">
            <span class="label">Tuition Fees</span> Rs<span class="amount"> 45K / yr</span>
        </p>
        <div>
            <p class="description">
                Lorem tincidunt lectus vitae id vulputate diam quam. Imperdiet non scelerisque turpis sed etiam
                ultrices. Blandit mollis dignissim egestas consectetur porttitor. Vulputate dolor pretium, dignissim eu
                augue sit ut convallis. Lectus est, magna urna feugiat sed Lorem tincidunt lectus vitae id vulputate
                diam quam. Imperdiet non scelerisque turpis sed etiam ultrices. Blandit mollis dignissim egestas
                consectetur porttitor. Vulputate dolor pretium, dignissim eu augue sit ut convallis. Lectus est, magna
                urna feugiat sed<br>
                <a href="#" class="read-more">read more</a>
            </p>
        </div>
        <div class="info-grid">
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head"><span><img
                            src="/public/img/png/Study-icon-big.png"></span> Study Level</div>
                <div class="card-detail-text">Graduate</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Duration-icon-big.png"></span> Duration
                </div>
                <div class="card-detail-text">13
                    months</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Calender-icon-big.png"></span> Mode of Study
                </div>
                <div class="card-detail-text">Hybrid</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Calender-icon-big.png"></span>Total Intake
                </div>
                <div class="card-detail-text">2,245</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Calender-icon-big.png"></span> Starting from
                </div>
                <div class="card-detail-text">May 15, 2025</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head"><span><img
                            src="/public/img/png/Study-icon-big.png"></span>Language Proficiency</div>
                <div class="card-detail-text">IELTS, PTE, TOEFL</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head"><span><img
                            src="/public/img/png/Study-icon-big.png"></span>Living Expenses</div>
                <div class="card-detail-text">USD 38K / yr</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head"><span><img
                            src="/public/img/png/Study-icon-big.png"></span>Post-Study Work Permit</div>
                <div class="card-detail-text">Allowed</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Calender-icon-big.png"></span> Ending On
                </div>
                <div class="card-detail-text">Oct 15, 2025</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Duration-icon-big.png"></span>Minimum Score
                </div>
                <div class="card-detail-text">7.8 GPA</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Duration-icon-big.png"></span> Minimum Language Score
                </div>
                <div class="card-detail-text">7.8 GPA</div>
            </div>
            <div class="detail">
                <div class="d-flex align-items-center gap-[6px] card-detail-head">
                    <span><img src="/public/img/png/Duration-icon-big.png"></span>Internship Opportunities
                </div>
                <div class="card-detail-text">Allowed</div>
            </div>
        </div>
        <div class="footer-row">
            <button class="app-fee">Application Fee <strong>Rs 1,250</strong></button>
            <div class="d-flex align-items-center gap-[5.5px]">
                <img src="/public/img/png/Duration-icon-big.png" class="deadline-img">
                <div class="deadline"> Deadline <span>May 15, 2025</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.program-modal {
    max-width: 1160px;
    margin: auto;
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h1 {
    font-size: 1.75rem;
    font-weight: bold;
    margin: 0;
}

.close-btn {
    font-size: 1.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
}

.tuition-fee .label,
.tuition-fee .amount,
.tuition-fee {
    color: #909090;
    line-height: 100%;
    font-weight: 700;
    font-size: 30px;
    letter-spacing: 4%;
    margin-top: 1.2rem;
}

.tuition-fee .amount {
    color: #000000 !important;
}

.tuition-fee {
    color: #ff5757 !important;
}

.description {
    margin-top: 32px;
    line-height: 150%;
    font-weight: 400;
    font-size: 18px;
    color: #666276;
}

.read-more {
    color: #ff5757;
    text-decoration: underline !important;
    font-weight: 400;
    font-size: 22px;
    font-weight: 400;
    line-height: 150%;
    display: inline-block;
    margin-top: 6px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
    margin-top: 2rem;
}

.card-detail-head {
    color: #767F8C;
    font-size: 18px;
    line-height: 28px;
    font-weight: 400;
    margin-bottom: 3px;
    margin-top: 10px;
}


.card-detail-text {
    color: #18191C;
    font-weight: 500;
    font-size: 20px;
    line-height: 33px;
}

.footer-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    border-top: 0.78px solid #CFDFE2;
    padding-top:28px;
}

.app-fee {
    border: 1.33px solid var(--lighter-shade, #64748B);
    color:var(--lighter-shade, #64748B);
    padding:21px 30px;
    border-radius: 16px;
    font-size: 22px;
    cursor: pointer;
    letter-spacing: 1%;
}

.deadline {
    font-size:21px;
    color: #909090;
letter-spacing: 1%;
line-height: 150%;
}
.deadline span {
    color:  #3C3C3C;
}

@media (max-width: 450px) {
    .program-modal {
    padding:1.6rem  1.3rem;
}
.modal-header h1 {
    font-size: 1.3rem;
}
.tuition-fee .label,
.tuition-fee .amount,
.tuition-fee {
    font-weight: 600;
    font-size: 22px;
    letter-spacing: 2%;
}
.description {
    margin-top: 16px;  
}
.read-more {
    font-size: 20px;
    margin-top: 3px;
}

.info-grid {
    gap: 10px;
    margin-top: 1rem;
}
.card-detail-text {
    font-size: 19px;
    line-height: 30px; 
}
.card-detail-head {
    font-size: 17px;
    line-height: 25px;
    margin-bottom: 3px;
}
.footer-row{
    gap:20px;
}
.app-fee {
    padding: 17px 15px;
    font-size: 20px;
}
}
@media only screen and (min-width: 425px) and (max-width: 890px) {
    .program-modal {
    padding:1.7rem  1.5rem;
}
.tuition-fee .label,
.tuition-fee .amount,
.tuition-fee {
    font-weight: 600;
    font-size: 26px;
}
.description {
    margin-top: 21px;  
}
.info-grid {
    gap: 15px;
    margin-top: 1rem;
}
.footer-row {
    margin-top: 1.5rem;
    padding-top: 22px;
    gap:22px;
}
.app-fee {
    padding: 20px 18px;
    font-size: 20px;
}
}



</style>