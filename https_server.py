#!/usr/bin/env python3

import http.server
import ssl
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add security headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {self.address_string()} - {format%args}")

def run_https_server():
    server_address = ('', 8443)
    httpd = HTTPServer(server_address, MyHTTPRequestHandler)

    # SSL configuration
    cert_file = '/home/ssuser/ssl-certs/certificate.pem'
    key_file = '/home/ssuser/ssl-certs/private-key.pem'

    if os.path.exists(cert_file) and os.path.exists(key_file):
        # Create SSL context
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        context.load_cert_chain(cert_file, key_file)

        # Wrap the socket with SSL
        httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

        print("🔒 HTTPS Server running on https://localhost:8443")
        print("🔒 HTTPS Server running on https://0.0.0.0:8443")
        print("📁 Serving files from:", os.getcwd())
        print("🛑 Press Ctrl+C to stop the server")
        print()
        print("🌐 MTLelect Samoa Website - Secure Access:")
        print("   - Homepage: https://localhost:8443")
        print("   - Services: https://localhost:8443/services.html")
        print("   - Projects: https://localhost:8443/projects.html")
        print("   - About: https://localhost:8443/about.html")
        print("   - Contact: https://localhost:8443/contact.html")

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            httpd.server_close()
    else:
        print("❌ SSL certificates not found!")
        print(f"Looking for:")
        print(f"  - Certificate: {cert_file}")
        print(f"  - Private Key: {key_file}")
        print("Please ensure SSL certificates are properly configured.")

if __name__ == '__main__':
    run_https_server()