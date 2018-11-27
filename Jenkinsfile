pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '-u root'
    }
  }

  environment {
    PATH = "$PATH:/usr/local/bin"
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
        sh 'docker-compose up'
      }
    }
  }
}
