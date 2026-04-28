// Prepare data payload for CPI Send Training Decision Notification service.
// MailStatus: NOSHOW_APPROVER_REQUEST — sends per-approver request mail.
// CPI Groovy renders bilingual HTML; this script only forwards data.

if (!$.context.MailfilteredApprovers || $.context.MailfilteredApprovers.length === 0 ||
    !$.context.MailfilteredApprovers[0] || !$.context.MailfilteredApprovers[0].AgentName ||
    !$.context.MailfilteredApprovers[0].Agent) {
    $.context.NoMoreMailApprover = true;
} else {
    var currentApprover = $.context.MailfilteredApprovers.shift();
    $.context.NoMoreMailApprover = false;

    $.context.MailRequestBody = {
        MailStatus: "NOSHOW_APPROVER_REQUEST",

        recipientEmail: currentApprover.AgentEmail,
        recipientNameEn: currentApprover.AgentName,
        recipientNameAr: currentApprover.AgentName,

        employeeId: $.context.employeeId,
        employeeName: $.context.employeeName,
        employeeNameEn: $.context.employeeName,
        employeeNameAr: $.context.employeeName,
        employeeMail: $.context.employeeMail,
        jobTitle: $.context.jobTitle,
        empWorkLocationDesc: $.context.empWorkLocationDesc,
        empDepartmentId: $.context.empDepartmentId,
        employeeInfo: $.context.employeeInfo,

        classId: $.context.classId,
        classTitle: $.context.classTitle,
        classStartDate: $.context.classStartDate,
        classEndDate: $.context.classEndDate,
        classStartDateDesc: $.context.classStartDateDesc,
        classEndDateDesc: $.context.classEndDateDesc,
        classStartDateDescAr: $.context.classStartDateDescAr,
        classEndDateDescAr: $.context.classEndDateDescAr,
        classTotalDays: $.context.classTotalDays,
        trainingLanguage: $.context.trainingLanguage,
        trainingTypeId: $.context.trainingTypeId,
        trainingTypeDesc: $.context.trainingTypeDesc,

        classLocationDesc: $.context.classLocationDesc,
        country: $.context.country,
        regionId: $.context.regionId,
        city: $.context.city,
        organizationDesc: $.context.organizationDesc,
        price: $.context.price,

        currentLevel: $.context.currentLevel
    };
}
