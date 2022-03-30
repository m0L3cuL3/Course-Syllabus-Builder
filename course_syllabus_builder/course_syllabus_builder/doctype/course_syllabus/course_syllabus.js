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
				
				//frm.set_df_property('college_department', 'options', dept)
				frm.fields_dict.plo_table.grid.update_docfield_property(
					"plo_department",
					"options",
					dept
				)
				refresh_field("plo_table")
		
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
				
				//frm.set_df_property('college_department', 'options', dept)
				frm.fields_dict.plo_table.grid.update_docfield_property(
					"plo_department",
					"options",
					dept
				)

				refresh_field("plo_table")
		
			})
	   }
	  
	}
});

frappe.ui.form.on("Course Syllabus", {
    course_main: function(frm){

		let course_title = frm.doc.course_main;
	  
		if(course_title){
			frappe.call({
				method: "course_syllabus_builder.course_syllabus_builder.doctype.course.course.get_course_schedule",
				args: {course_title: course_title}
			}).done((r) => {
				console.log(r.message)

				frm.doc.course_schedule = []

				$.each(r.message, function(_i, e){
					console.log(e)
					let entry = frm.add_child('course_schedule')
					entry.section = e.section
					entry.day_time = e.day_time
					entry.room = e.room
				})
				
				

				refresh_field("course_schedule")
		
			})
	   }
	  
	}
});

// adding fetch
frappe.ui.form.on('Course Syllabus', {
	refresh: function(frm){
		console.log("test")
		frm.add_fetch('course_main', 'course_title','course_title')
		frm.add_fetch('course_main', 'course_code','course_code')
		frm.add_fetch('course_main', 'college_name','college_name')
		frm.add_fetch('course_main', 'college_department','college_department')
		frm.add_fetch('course_main', 'course_description', 'course_description')
	}
});

// filter faculty by assigned college.
frappe.ui.form.on('Course Syllabus', {
	college_name: function(frm){
		frm.fields_dict['faculty_roles'].grid.get_field('faculty').get_query = function(doc) {
			return {
				filters: {
					"assigned_college": frm.doc.college_name
				}
			}
		}
	}
});




// var set_css = function (frm) {
// 	document.querySelectorAll("[data-fieldname=add_dept]")[1].style.color ='white';
// 	document.querySelectorAll("[data-fieldname=add_dept]")[1].style.backgroundColor ='green';
// 	document.querySelectorAll("[data-fieldname=add_dept]")[1].style.height = "30px";
// 	document.querySelectorAll("[data-fieldname=add_dept]")[1].style.width = "320px";

// 	document.querySelectorAll("[data-fieldname=delete_dept]")[1].style.color ='white';
// 	document.querySelectorAll("[data-fieldname=delete_dept]")[1].style.backgroundColor ='red';
// 	document.querySelectorAll("[data-fieldname=delete_dept]")[1].style.height = "30px";
// 	document.querySelectorAll("[data-fieldname=delete_dept]")[1].style.width = "320px";
// }



