# Copyright (c) 2022, Sean Baang and Contributors
# See license.txt

import frappe
import frappe.defaults
import unittest

class TestCourseSyllabus(unittest.TestCase):
	def setUp(self):
		frappe.set_user("faculty@csb.com")
		self.doc = frappe.new_doc('CC15')
