// Prepare data payload for CPI Send Training Decision Notification service.
// MailStatus: NOSHOW_DECISION — sends approval/rejection notice to approver chain
// and notification list. CPI Groovy reads `isRejected` to switch subject and copy.

if (!$.context.MailfilteredApprovers || $.context.MailfilteredApprovers.length === 0 ||
    !$.context.MailfilteredApprovers[0] || !$.context.MailfilteredApprovers[0].AgentName ||
    !$.context.MailfilteredApprovers[0].Agent) {
    $.context.NoMoreMailApprover = true;
} else {
    var currentApprover = $.context.MailfilteredApprovers.shift();
    $.context.NoMoreMailApprover = false;

    $.context.MailNotificationRequestBody = {
        MailStatus: "NOSHOW_DECISION",
        isRejected: $.context.isRejected || false,

        recipientEmail: currentApprover.AgentEmail,
        recipientNameEn: currentApprover.AgentName,
        recipientNameAr: currentApprover.AgentName,
        approverLevel: currentApprover.Level,

        employeeId: $.context.employeeId,
        employeeName: $.context.employeeName,
        employeeNameEn: $.context.employeeName,
        employeeNameAr: $.context.employeeName,
        employeeMail: $.context.employeeMail,
        employeeInfo: $.context.employeeInfo,

        classId: $.context.classId,
        classTitle: $.context.classTitle,
        classStartDate: $.context.classStartDate,
        classEndDate: $.context.classEndDate,
        classStartDateDesc: $.context.classStartDateDesc,
        classEndDateDesc: $.context.classEndDateDesc,
        classStartDateDescAr: $.context.classStartDateDescAr,
        classEndDateDescAr: $.context.classEndDateDescAr,
        trainingTypeId: $.context.trainingTypeId,
        trainingTypeDesc: $.context.trainingTypeDesc,

        currentLevel: $.context.currentLevel,
        lastApproverData: $.context.lastApproverData
    };
}
