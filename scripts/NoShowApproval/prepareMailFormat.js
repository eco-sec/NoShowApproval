// Prepare data payload for CPI Send Training Decision Notification service
// MailStatus: NOSHOW_APPROVER_REQUEST - Sends no-show notification to the current approver
if (!$.context.MailfilteredApprovers || $.context.MailfilteredApprovers.length === 0 ||
	!$.context.MailfilteredApprovers[0] || !$.context.MailfilteredApprovers[0].AgentName || !$.context.MailfilteredApprovers[0].Agent) {
	$.context.NoMoreMailApprover = true;
} else {
	var currentApprover = $.context.MailfilteredApprovers.shift();
	$.context.NoMoreMailApprover = false;

	$.context.MailRequestBody = {
		MailStatus: "NOSHOW_APPROVER_REQUEST",
		// Recipient (the approver)
		recipientEmail: currentApprover.AgentEmail,
		recipientNameEn: currentApprover.AgentName,
		recipientNameAr: currentApprover.AgentName,
		// Employee info
		employeeName: $.context.employeeName,
		employeeId: $.context.employeeId,
		employeeMail: $.context.employeeMail,
		jobTitle: $.context.jobTitle,
		empWorkLocationDesc: $.context.empWorkLocationDesc,
		empDepartmentId: $.context.empDepartmentId,
		employeeInfo: $.context.employeeInfo,
		// Class/Training details
		classTitle: $.context.classTitle,
		classId: $.context.classId,
		classStartDateDesc: $.context.classStartDateDesc,
		classEndDateDesc: $.context.classEndDateDesc,
		classTotalDays: $.context.classTotalDays,
		trainingLanguage: $.context.trainingLanguage,
		classLocationDesc: $.context.classLocationDesc,
		country: $.context.country,
		regionId: $.context.regionId,
		city: $.context.city,
		organizationDesc: $.context.organizationDesc,
		price: $.context.price,
		trainingTypeId: $.context.trainingTypeId
	};
}
