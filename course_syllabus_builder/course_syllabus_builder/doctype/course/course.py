# Copyright (c) 2022, Sean Baang and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document

class Course(Document):
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

@frappe.whitelist()
def get_course_schedule(course_title):
	schedule = frappe.db.sql(f"""
		SELECT
		section,
		day_time,
		room
		FROM
		`tabCourse Schedule`
		WHERE
		parent = '{course_title}'
	""", as_dict=True)

	return schedule
