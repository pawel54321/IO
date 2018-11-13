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
        sh 'python manage.py runserver'
      }
    }
    stage('build') {
      script {
        docker.build -t test@python .
      }
    }
  }
}
