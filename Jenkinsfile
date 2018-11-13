// Jenkinsfile
pipeline {

  agent {
    docker {
      image 'python:3.7'
    }
  }

  stages {
    stage('build') {
      steps {
        sh 'ls'
        sh 'python --version'
        sh 'docker build -t test@python .'
      }
    }
  }
}
