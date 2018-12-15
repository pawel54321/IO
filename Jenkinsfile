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

    stage('Deploy'){
      steps {
        dir('react-app') {
          sh 'npm run start'
        }
      }
    }
  }
}
