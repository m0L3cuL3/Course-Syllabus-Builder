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

				frm.fields_dict.clo_table.grid.update_docfield_property(
					"department",
					"options",
					dept
				)

				refresh_field("clo_table")
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

				frm.fields_dict.clo_table.grid.update_docfield_property(
					"department",
					"options",
					dept
				)

				refresh_field("clo_table")
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

// get letter grade.
frappe.ui.form.on('Course Syllabus', {
	gdlg_button: function(frm){

		// 92-100 A Excellent
		// 84-91.99 A- Very Good
		// 76-83.99 B Good
		// 68-75.99 B- Fair
		// 60-67.99 C Satisfactory
		// 50-59.99 D Passed
		// 49.99 and below F Failed

		let min_percent = [92,84,76,68,60,50,49.99]
		let max_percent = [100,91.99,83.99,75.99,67.99,59.99,48.99]
		let letter_grade = ['A','A-','B','B-','C','D','F']
		let word_grade = ['Excellent', 'Very Good', 'Good', 'Fair', 'Satisfactory', 'Passed', 'Failed']

		console.log(min_percent[0])
		console.log(max_percent[0])
		console.log(letter_grade[0])

		for(let i=0; i<min_percent.length; i++){
			let entry = frm.add_child('letter_grade_table')
			entry.min_percent = min_percent[i]
			entry.max_percent = max_percent[i]
			entry.letter_grade = letter_grade[i]
			entry.word_grade = word_grade[i]
		}
		
		frm.get_field("letter_grade_table").grid.only_sortable();
		refresh_field('letter_grade_table')
	}
});

frappe.ui.form.on('Course Syllabus', {
	refresh: function(frm){

		frm.get_field("letter_grade_table").grid.only_sortable();
		refresh_field('letter_grade_table')
		set_css(frm)
	}

});


var set_css = function (frm) {
	document.querySelectorAll("[data-fieldname=gdlg_button]")[1].style.color ='white';
	document.querySelectorAll("[data-fieldname=gdlg_button]")[1].style.backgroundColor ='green';
	document.querySelectorAll("[data-fieldname=gdlg_button]")[1].style.height = "30px";
	document.querySelectorAll("[data-fieldname=gdlg_button]")[1].style.width = "320px";

	// document.querySelectorAll("[data-fieldname=delete_dept]")[1].style.color ='white';
	// document.querySelectorAll("[data-fieldname=delete_dept]")[1].style.backgroundColor ='red';
	// document.querySelectorAll("[data-fieldname=delete_dept]")[1].style.height = "30px";
	// document.querySelectorAll("[data-fieldname=delete_dept]")[1].style.width = "320px";
}


// custom print buttons
// frappe.ui.form.on('Course Syllabus', {
// 	refresh: function (frm) {
// 		frm.add_custom_button('Preview', () => {
// 			frm.print_doc(frm.doc.ccs_format);
// 		});
// 	}
// });


