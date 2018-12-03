pipeline {

  agent {
    docker {
      image 'node:alpine'
      args '-u root'
    }
  }

  environment {
    PATH = "$PATH:/usr/local/bin/docker-compose"
  }

  stages {
    stage('Build'){
      steps{
        dir('react-app') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }
    stage('Test'){
      steps{
        dir('react-app') {
          sh 'npm run test -- --coverage'
        }
      }
    }
    stage('Deploy'){
      steps {
        sh 'echo PATH'
        sh 'docker-compose up'
      }
    }
  }
}
