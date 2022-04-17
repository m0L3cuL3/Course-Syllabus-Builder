# Copyright (c) 2022, Sean Baang and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname

class DepartmentLearningOutcomes(Document):
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
def get_graduate_attribute_by_department(college):
	graduate_attribute = frappe.db.sql(f"""
		SELECT
		graduate_attribute
		FROM
		`tabGraduate Attribute Table`
		WHERE
		parent = '{}'
	""", as_dict=True)

	return graduate_attribute