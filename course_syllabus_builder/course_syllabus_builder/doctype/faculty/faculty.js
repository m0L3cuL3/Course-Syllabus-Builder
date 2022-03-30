// Copyright (c) 2022, Sean Baang and contributors
// For license information, please see license.txt

frappe.ui.form.on('Faculty', {
	refresh(frm){
		var first_name = frm.doc.first_name
		var middle_initial = frm.doc.middle_initial
		var last_name = frm.doc.last_name
	
		var full_name = first_name.concat(" ", middle_initial, " ", last_name)
	
		frm.set_value('full_name', full_name)
		frm.set_df_property('full_name', 'read_only', 1)
		frm.toggle_display('full_name', frm.doc.full_name === full_name)
	}
});

frappe.ui.form.on('Faculty', {
	after_save(frm){
		var first_name = frm.doc.first_name
		var middle_initial = frm.doc.middle_initial
		var last_name = frm.doc.last_name
	
		var full_name = first_name.concat(" ", middle_initial, " ", last_name)
	
		frm.set_value('full_name', full_name)
		frm.set_df_property('full_name', 'read_only', 1)
		frm.toggle_display('full_name', frm.doc.full_name === full_name)
	}
});

frappe.ui.form.on('Faculty', {
	refresh: function(frm) {
		let college = frm.doc.assigned_college;
		  
		if(college){
			frappe.call({
				method: "course_syllabus_builder.course_syllabus_builder.doctype.faculty.faculty.get_college_departments",
				args: {college: college}
			}).done((r) => {
				console.log(r.message)

				let dept = []
			
				$.each(r.message, function(_i, e){
					console.log(e)
					dept[_i] = e.department
				})
				
				frm.set_df_property('assigned_department', 'options', dept)
				
				refresh_field("assigned_department")
		
			})
		}
		
	}
})

frappe.ui.form.on('Faculty', {
	assigned_college: function(frm) {
		let college = frm.doc.assigned_college;
		  
		if(college){
			frappe.call({
				method: "course_syllabus_builder.course_syllabus_builder.doctype.faculty.faculty.get_college_departments",
				args: {college: college}
			}).done((r) => {
				console.log(r.message)

				let dept = []
			
				$.each(r.message, function(_i, e){
					console.log(e)
					dept[_i] = e.department
				})
				
				frm.set_df_property('assigned_department', 'options', dept)
				
				refresh_field("assigned_department")
		
			})
		}
		
	}
})

