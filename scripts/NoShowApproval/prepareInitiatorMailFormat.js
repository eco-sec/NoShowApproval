// Prepare data payload for CPI Send Training Decision Notification service
// MailStatus: NOSHOW_INITIATOR_PROGRESS - Sends no-show approval progress to initiator/employee
$.context.NoMoreMailApprover = false;

$.context.MailInitiatorRequestBody = {
	MailStatus: "NOSHOW_INITIATOR_PROGRESS",
	// Employee info
	employeeName: $.context.employeeName,
	employeeNameEn: $.context.employeeName,
	employeeId: $.context.employeeId,
	employeeMail: $.context.employeeMail,
	// Class/Training details
	classTitle: $.context.classTitle,
	classId: $.context.classId,
	classStartDateDesc: $.context.classStartDateDesc,
	classEndDateDesc: $.context.classEndDateDesc,
	classStartDateDescAr: $.context.classStartDateDescAr,
	classEndDateDescAr: $.context.classEndDateDescAr,
	trainingTypeDesc: $.context.trainingTypeDesc,
	trainingTypeId: $.context.trainingTypeId,
	// Approval progress data
	currentLevel: $.context.currentLevel,
	lastApproverData: $.context.lastApproverData,
	remainApprover: $.context.RemainApprover
};
