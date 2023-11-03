const section = document.getElementById("section");
const about = document.getElementById("About");
const home = document.getElementById("Home");
const searchResult = document.getElementById("search-list");
const bookListElement = document.getElementById('book-list');
const loading = document.getElementById('loading');
const userDetails = document.getElementById("userDetails");

		document.getElementById('search-list').addEventListener('keydown', function(event) {
		  if (event.keyCode === 13) {
		    const inputValue = event.target.value;
		    console.log('User pressed Enter key with value:', inputValue);
		
		    // Call the showHome() function here
		    showSearch();
		  }
		});
		
		function showHome(){
			section.style.display = "flex";
			home.style.display = "none";
			about.style.display = "none";
			userDetails.style.display = "none";
		}
		
		function showAbout(){
			section.style.display = "none";
			home.style.display = "none";
			about.style.display = "block";
			userDetails.style.display = "none";
		}
		
		function showLoading(){
			loading.style.display = "flex";
			userDetails.style.display = "none";
		}
		function hideLoading(){
			loading.style.display = "none";
			userDetails.style.display = "none";
		}
		
		function clearBookDetails(){
			bookListElement.innerHTML = "";
		}
		function showSearch(){	
			section.style.display = "none";
			home.style.display = "block";
			about.style.display = "none";
			clearBookDetails();
			showLoading();
			fetch("https://openlibrary.org/search.json?title="+ searchResult.value)
			.then(res => res.json())
			.then(data => {
				hideLoading();
				 if (Array.isArray(data.docs) && data.docs.length > 0) {
		                    data.docs.forEach(book => {
		                        const title = book.title;
		                        const cover = book.cover_i;
		                        const author = book.author_name?"Author: "+ book.author_name.join(', ') : 'Unknown Author';
		                        const total_edition = "Total_edition:"+book.edition_count;
		                        const year = "First Publish Year: "+book.first_publish_year;
		                        
		                        // getting image from cover_i;							  
								const imageUrl = "https://covers.openlibrary.org/b/id/" + cover + "-L.jpg";
								const fallbackImageUrl = "notAvailable.jpg"; // Replace with your desired fallback image URL
								
								fetch(imageUrl)
								  .then(response => response.blob())
								  .then(imageBlob => {
								    const imageElement = document.createElement('img');
								    imageElement.src = URL.createObjectURL(imageBlob);
								    imageElement.style.cssText = "width:200px;height:250px;";
								    imageElement.onerror = function() {
								      this.src = fallbackImageUrl;
								    };
								    divElement.appendChild(imageElement);
								  })
								  .catch(error => console.error("Error fetching image:", error));
									 
									 
		                        const divElement = document.createElement('div');
		                        divElement.style.cssText = 
		                        "border:3px solid white;background-color:white;width:300px;height:444px;margin:50px;padding:10px;display:flex;flex-direction:column;justify-content:center;align-items:center;box-shadow: 0px 0px 50px rgba(0,0,0, 0.9);";
		                        const titleElement = document.createElement('h2');
		                        titleElement.textContent = title;
		                        titleElement.style.cssText ="font-size:23px;margin-top:-10px;";
		                        const authorElement = document.createElement('h3');
		                        authorElement.textContent = author;
		                        authorElement.style.cssText ="font-size:18px;margin-top:-10px;";
		                        
		                        const editionElement = document.createElement('h4');
		                        editionElement.textContent = total_edition;
		                        editionElement.style.cssText ="font-size:15px;margin-top:-10px;";
		                        
		                        const yearElement = document.createElement('h4');
		                        yearElement.textContent = year;
		                        yearElement.style.cssText ="font-size:13px;margin-top:-10px;";
		                         
		                        divElement.appendChild(titleElement);
		                        divElement.appendChild(authorElement);
		                        divElement.appendChild(editionElement);
		                        divElement.appendChild(yearElement);
		                       
		                        bookListElement.appendChild(divElement); 
					});
				}else {
		                    var response = "No books found in the response.";
		                    console.log(response);
		                    const responseElement = document.createElement('h4');
		                    responseElement.textContent = response;
		                    bookListElement.appendChild(responseElement);
		                    
		                }
		            })
				.catch(err => console.log(err));
				
				
				
		}

		function visibilityOff() {
	        var loginPass = document.getElementById("loginPass");
	        var visibilityOff = document.getElementById("visibility");
	        
	        if (loginPass.type === "password") {
	            loginPass.type = "text";
	            visibilityOff.innerHTML = "visibility_off";
	        } else {
	            loginPass.type = "password";
	            visibilityOff.innerHTML = "visibility";
	        }
	    }

	
	
	
	
	
	
	