// Prepare data payload for CPI Send Training Decision Notification service
// MailStatus: NOSHOW_DECISION - Sends no-show decision notification to approver list
if (!$.context.MailfilteredApprovers || $.context.MailfilteredApprovers.length === 0 ||
	!$.context.MailfilteredApprovers[0] || !$.context.MailfilteredApprovers[0].AgentName || !$.context.MailfilteredApprovers[0].Agent) {
	$.context.NoMoreMailApprover = true;
} else {
	var currentApprover = $.context.MailfilteredApprovers.shift();
	$.context.NoMoreMailApprover = false;

	$.context.MailNotificationRequestBody = {
		MailStatus: "NOSHOW_DECISION",
		isRejected: $.context.isRejected || false,
		// Recipient
		recipientEmail: currentApprover.AgentEmail,
		recipientNameEn: currentApprover.AgentName,
		recipientNameAr: currentApprover.AgentName,
		// Employee info
		employeeName: $.context.employeeName,
		employeeId: $.context.employeeId,
		employeeMail: $.context.employeeMail,
		classTitle: $.context.classTitle,
		classId: $.context.classId,
		trainingTypeId: $.context.trainingTypeId,
		// Manager/last approver details
		approverLevel: currentApprover.Level,
		lastApproverData: $.context.lastApproverData,
		// Employee detailed info for decision
		employeeInfo: $.context.employeeInfo
	};
}
