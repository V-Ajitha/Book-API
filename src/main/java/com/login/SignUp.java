package com.login;

import java.sql.PreparedStatement;
import java.sql.ResultSet;


public class SignUp {
		// global variable
		String name;
		String email;
		String pass;
		String address;
		
		String loginName;
		String loginPass;
		
		String userEmail;
		String newPassword;

		ResultSet rs;

		public String connection(){
			// inserting the user's signup details in mysql using jdbc;
			try {
				String insertQuery = "insert into SignUp(Name,Email,Password,Address) values(?,?,?,?)";
				PreparedStatement pst = DBConnection.getConnection(insertQuery);
				System.out.println("name:"+name);
				pst.setString(1,name);
				pst.setString(2,email);
				pst.setString(3,pass);
				pst.setString(4,address);
				pst.executeUpdate();
				
				return "success";
			}catch(Exception ee) {
				System.out.println("Error:"+ee);
				return "error";
			}
			
		}
		
		public String verifyUser() {
			// verify the user's name and password from mysql using jdbc		
			try {
				// for Statement execution --> String selectQuery = "select * from SignUp where Name="+loginName+" and Password="+loginPass;
				String selectQuery = "select * from SignUp where Email = ? and Password = ?";
				PreparedStatement pst = DBConnection.getConnection(selectQuery);
				pst.setString(1, loginName);
				pst.setString(2, loginPass);
				rs = pst.executeQuery();
//				System.out.println("rs:"+rs);
				if(rs.next()) {
					return "success";
				}
				else {
					return "error";
				}
				
			}catch(Exception ee) {
				System.out.println("Error:"+ee);
				return "error";
				
//				System.out.println("loginName="+loginName);
//				System.out.println("loginPass="+loginPass);
//				System.out.println("Rs:"+rs);
			}
		}
		
		public String logout() {
			return "success";

		}
		
		public String forgotBtn() {
		    try {
		        String updateQuery = "update SignUp SET Password = ? WHERE Email = ?";
		        PreparedStatement pst = DBConnection.getConnection(updateQuery);
		        pst.setString(1, newPassword);  // Set the new password
		        pst.setString(2, userEmail);     // Set the user's email
		        int rowsUpdated = pst.executeUpdate();

		        if (rowsUpdated > 0) {
		        	System.out.println("Success");
		            return "success";  // Password updated successfully
		        } else {
		        	System.out.println("Error");
		            return "error";    // No rows updated (email not found or update failed)
		        }
		    } catch (Exception ee) {
		        System.out.println("Error: " + ee);
		        return "error";  // An error occurred
		    }
		}
		
		

		
		// getter setter methods to get the html's input in java file...
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getPass() {
			return pass;
		}
		public void setPass(String pass) {
			this.pass = pass;
		}
		public String getAddress() {
			return address;
		}
		public void setAddress(String address) {
			this.address = address;
		}
		
		public String getLoginName() {
			return loginName;
		}
		public void setLoginName(String loginName) {
			this.loginName = loginName;
		}
		public String getLoginPass() {
			return loginPass;
		}
		public void setLoginPass(String loginPass) {
			this.loginPass = loginPass;
		}
		
		public String getUserEmail() {
			return userEmail;
		}
		public void setUserEmail(String userEmail) {
			System.out.println("userEmail"+userEmail);
			this.userEmail = userEmail;
		}
		public String getNewPassword() {
			System.out.println("newPassword1"+newPassword);
			return newPassword;
		}
		public void setNewPassword(String newPassword) {
			System.out.println("newPassword"+newPassword);
			this.newPassword = newPassword;
		}
	}

