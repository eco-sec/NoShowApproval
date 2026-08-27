// Determine decision-related values
var isRejected = $.usertasks.usertask2.last.decision === "reject";

$.context.decisionText = isRejected ? "No Show Rejected" : "No Show Approved";
$.context.decisionValue = isRejected ? "REJECTED" : "APPROVED";
$.context.approved = !isRejected;
var enrollmentStatusID = isRejected ? "NO_SHOW_REJECTED" : "NO_SHOW_APPROVED";

// Define the LMS request body
$.context.LmsRequestBody = {
    "primaryKey": "",
    "enrollmentStatus": [{
        "scheduleID": Math.floor(parseInt($.context.classId)), // Convert to integer
        "userID": $.context.employeeId, // Employee ID
        "newEnrollmentStatusID": enrollmentStatusID,
        "cancellationReasonID":  "NO SHOW" // Only set for rejection
    }]
};



// Set HANA request body
$.context.hanaRequestBody = {
    "STATUS": $.context.decisionText  // Holds "APPROVED" or "REJECTED"
};