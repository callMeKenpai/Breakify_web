import webapp2
import urllib
import urllib2
import json
import jinja2
import re
import os
import sched, time
import time
from datetime import datetime

jinja_environment = jinja2.Environment(
	loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class MainHandler(webapp2.RequestHandler):
	def get(self):
		template = jinja_environment.get_template('templates/Main.html')
		self.response.write(template.render())

class UpbeatHandler(webapp2.RequestHandler):
	def get(self):
		template = jinja_environment.get_template('templates/upbeat.html')
		self.response.write(template.render())

class ChillHandler(webapp2.RequestHandler):
	def get(self):
		template = jinja_environment.get_template('templates/chill.html')
		self.response.write(template.render())

class IntenseHandler(webapp2.RequestHandler):
	def get(self):
		template = jinja_environment.get_template('templates/intense.html')
		self.response.write(template.render())

class FocusedHandler(webapp2.RequestHandler):
	def get(self):
		template = jinja_environment.get_template('templates/focused.html')
		self.response.write(template.render())

class ZenHandler(webapp2.RequestHandler):
	def get(self):
		template = jinja_environment.get_template('templates/zen.html')
		self.response.write(template.render())

app = webapp2.WSGIApplication([
	('/', MainHandler),('/upbeat',UpbeatHandler),('/chill',ChillHandler),('/intense',IntenseHandler),('/focused',FocusedHandler),('/zen',ZenHandler)])
