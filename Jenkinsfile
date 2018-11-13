// Jenkinsfile
pipeline {

  agent {
    docker {
      image 'python:3.7'
    }
  }

  stages {
    stage('test') {
      steps {
        sh 'python --version'
        sh 'python manage runserver'
        sh 'docker ps'
      }
    }
  }
}
