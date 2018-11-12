// Jenkinsfile
pipeline {
  checkout scm
  def pythonImage
  agent {
    docker {
      image 'node'
      args '-u root'
    }
    stage('build docker image') {
      pythonImage = docker.build("io:build")
    }
  /*
    stage('test') {
      pythonImage.inside {
        sh '''. /tmp/venv/bin/activate && python -m pytest --junitxml=results.xml'''
      }
    }
    stage('collect test results') {
      junit 'results.xml'
    }
  */  
  }
}
