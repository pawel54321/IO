pipeline {
  environment {
    PATH = "$PATH:/usr/bin"
  }

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
        sh 'sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o docker-compose'
        sh 'sudo chmod +x docker-compose'
        sh 'docker-compose up'
      }
    }
  }
}
