// Copyright (c) 2022, Sean Baang and contributors
// For license information, please see license.txt

frappe.ui.form.on('Course', {
	refresh: function(frm) {
		let college = frm.doc.college_name;
		  
			if(college){
				frappe.call({
					method: "course_syllabus_builder.course_syllabus_builder.doctype.course.course.get_college_departments",
					args: {college: college}
				}).done((r) => {
					console.log(r.message)
	
					let dept = []
				
					$.each(r.message, function(_i, e){
						console.log(e)
						dept[_i] = e.department
					})
					
					frm.set_df_property('college_department', 'options', dept)

					refresh_field("college_department")
			
				})
		   }
	}
})

frappe.ui.form.on('Course', {

	college_name: function(frm){

		let college = frm.doc.college_name;
		  
			if(college){
				frappe.call({
					method: "course_syllabus_builder.course_syllabus_builder.doctype.course.course.get_college_departments",
					args: {college: college}
				}).done((r) => {
					console.log(r.message)
	
					let dept = []
				
					$.each(r.message, function(_i, e){
						console.log(e)
						dept[_i] = e.department
					})
					
					frm.set_df_property('college_department', 'options', dept)

					refresh_field("college_department")
			
				})
		   }
	  
	}
});