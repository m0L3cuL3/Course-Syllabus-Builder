# Copyright (c) 2022, Sean Baang and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class CourseSyllabus(Document):
	pass

@frappe.whitelist()
def get_college_departments(college):
	departments = frappe.db.sql(f"""
		SELECT
		department
		FROM
		`tabDepartment`
		WHERE
		parent = '{college}'
	""", as_dict=True)

	return departments

def get_faculty_by_college(college):
	faculty = frappe.db.sql(f"""
		SELECT
		name
		FROM
		`tabFaculty`
		WHERE
		assigned_college = '{college}'
	""", as_dict=True)

	return faculty