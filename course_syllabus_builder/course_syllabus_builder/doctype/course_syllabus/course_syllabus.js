// Copyright (c) 2022, Sean Baang and contributors
// For license information, please see license.txt

frappe.ui.form.on('Course Syllabus', {
	refresh: function(frm) {
		let college = frm.doc.college_name;
		  
			if(college){
				frappe.call({
					method: "course_syllabus_builder.course_syllabus_builder.doctype.course_syllabus.course_syllabus.get_college_departments",
					args: {college: college}
				}).done((r) => {
					console.log(r.message)
	
					let dept = []
				
					$.each(r.message, function(_i, e){
						console.log(e)
						dept[_i] = e.department
					})
					
					frm.set_df_property('college_department', 'options', dept)
					frm.fields_dict.plo_table.grid.update_docfield_property(
						"plo_department",
						"options",
						dept
					)

					refresh_field("college_department")
			
				})
		   }
	}
})

frappe.ui.form.on('Course Syllabus', {

	college_name: function(frm){

		let college = frm.doc.college_name;
	  
		if(college){
			frappe.call({
				method: "course_syllabus_builder.course_syllabus_builder.doctype.course_syllabus.course_syllabus.get_college_departments",
				args: {college: college}
			}).done((r) => {
				console.log(r.message)

				let dept = []
			
				$.each(r.message, function(_i, e){
					console.log(e)
					dept[_i] = e.department
				})
				
				frm.set_df_property('college_department', 'options', dept)
				frm.fields_dict.plo_table.grid.update_docfield_property(
					"plo_department",
					"options",
					dept
				)

				refresh_field("college_department")
		
			})
	   }
	  
	}
});

frappe.ui.form.on('Course Syllabus', {
	college_name: function(frm){
		frm.fields_dict['prepared_by'].get_query = function(doc) {
			return {
				filters: {
					"assigned_college": frm.doc.college_name
				}
			}
		}
		frm.fields_dict['reviewed_by'].get_query = function(doc) {
			return {
				filters: {
					"assigned_college": frm.doc.college_name
				}
			}
		}
		frm.fields_dict['approved_by'].get_query = function(doc) {
			return {
				filters: {
					"assigned_college": frm.doc.college_name
				}
			}
		}
	}
});


