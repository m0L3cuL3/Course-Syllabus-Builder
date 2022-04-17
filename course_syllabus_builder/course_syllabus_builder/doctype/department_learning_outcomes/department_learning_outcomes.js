// Copyright (c) 2022, Sean Baang and contributors
// For license information, please see license.txt

frappe.ui.form.on('Department Learning Outcomes', {
	refresh: function(frm) {
		let college = frm.doc.dlo_college;
		  
		if(college){
			frappe.call({
				method: "course_syllabus_builder.course_syllabus_builder.doctype.department_learning_outcomes.department_learning_outcomes.get_college_departments",
				args: {college: college}
			}).done((r) => {
				console.log(r.message)

				let dept = []
			
				$.each(r.message, function(_i, e){
					console.log(e)
					dept[_i] = e.department
				})
				
				frm.set_df_property('dlo_department', 'options', dept)
				
				refresh_field("dlo_department")
		
			})
		}
		
	},
	dlo_college: function(frm) {
		let college = frm.doc.dlo_college;
		  
		if(college){
			frappe.call({
				method: "course_syllabus_builder.course_syllabus_builder.doctype.department_learning_outcomes.department_learning_outcomes.get_college_departments",
				args: {college: college}
			}).done((r) => {
				console.log(r.message)

				let dept = []
			
				$.each(r.message, function(_i, e){
					console.log(e)
					dept[_i] = e.department
				})
				
				frm.set_df_property('dlo_department', 'options', dept)

				refresh_field("dlo_department")
		
			})
		}
		
	}
})
