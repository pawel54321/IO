// Jenkinsfile
pipeline {

  environment {
    registry = “gpzak/IO”
    registryCredential = ‘dockerhub’
    dockerImage = ‘’
  }

  agent {
    dockerfile true
  }

  tools {
    nodejs “node”
  }

  stage('Cloning Git') {
      steps {
        git 'https://github.com/gpzak/IO.git'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
        sh 'npm run bowerInstall'
      }
    }

    stage('Test') {
      steps {
         sh 'npm test'
      }
    }
  stage(‘Building image’) {
    steps{
      script {
        dockerImage = docker.build registry + “:$BUILD_NUMBER”
      }
    }
  }
  stage(‘Deploy Image’) {
    steps{
       script {
          docker.withRegistry( ‘’, registryCredential ) {
          dockerImage.push()
        }
      }
    }
  }
}
