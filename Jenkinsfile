pipeline {

  agent {
    docker {
      image 'node:alpine'
      args '-u root'
    }
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
    
    withEnv(['PATH=/usr/local/bin']) {
      stage('Deploy'){
        steps {
          sh 'docker-compose up'
        }
      }
    }
  }
}
