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


