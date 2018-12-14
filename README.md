# ebay-broken-image
*project description goes here*


## Getting Started
Get you a copy of the project up and running on your local machine for development and testing purposes.

### Requirement
This application is written in ```Python 3.7```

### Installation
Use ```pip``` to install dependency
```
pip install requirements.txt
```

### Testing
*local testing goes here*

## Deployment
This application is deployment ready for Google Cloud Platform (GCP) Python Runtime Function.

Export GCP credential
```
export GOOGLE_APPLICATION_CREDENTIALS="PASS_TO_CREDENTIAL_FILE"
```

In ```beautifulsoup``` directory run
```
gcloud functions deploy ebay_beautifulsoup --runtime python37 --trigger-http
```

In ```pillow``` directory run
```
gcloud functions deploy ebay_pillow --runtime python37 --trigger-http
```

In ```vgg16``` directory run
```
gcloud functions deploy ebay_vgg16 --runtime python37 --trigger-http
```


## Built With
* [Flask](http://flask.pocoo.org/) - Web application microframework
* [BeautifulSoup](https://pypi.org/project/beautifulsoup4/) - Web page information scraper
* [Keras](https://keras.io/) - Open source neural network library


## Authors
* **Boyu Jiang** (Minerva class of 2020) - *Initial work* - [GitHub](https://github.com/Boyu1997)


## License
*project license goes here*


## Acknowledgments
* **Mercari Euro Hack 2018** - *Project ideation* - [WebPage](https://challengerocket.com/mercari)
* **Jeff Cui** (Minerva class of 2019) - *Project ideation* - [GitHub](https://github.com/jeffacce)
* **Qiusu Wang** (Minerva class of 2020) - *Project ideation* - [GitHub](https://github.com/qiusuw)
